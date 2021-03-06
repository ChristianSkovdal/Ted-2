﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Ted
{
    [Route("api/[controller]")]
    public class UserController : ControllerBase<User>
    {
        public UserController(TedContext db, AuthenticationHandler auth)
            :base(db, auth)
        {            
        }
        
        [HttpPost]
        public JsonResult CreateUser([FromBody]User value)
        {
            if (string.IsNullOrEmpty(value.fullName))
                throw new ArgumentException(nameof(value.fullName));
            if (string.IsNullOrEmpty(value.email))
                throw new ArgumentException(nameof(value.email));
            if (string.IsNullOrEmpty(value.password))
                throw new ArgumentException(nameof(value.password));

            Create(value);

            return Json(new
            {
                success = true,
                data = new { value.id }
            });
        }
      
        [HttpPut("{token}/{id}")]
        public void UpdateUser(string token, int id, [FromBody]JObject value)
        {
            if (_auth.Authenticate(token, id) == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            Update(id, value);
        }

        [HttpDelete("{token}/{id}")]
        public void Delete(string token, int id)
        {
            if (_auth.Authenticate(token, id) == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            Delete(id);
        }

        [HttpPost("login")]
        public JsonResult Login([FromBody]Login value)
        {
            if (string.IsNullOrEmpty(value.email))
                throw new ArgumentException(nameof(value.email));
            if (string.IsNullOrEmpty(value.password))
                throw new ArgumentException(nameof(value.password));

            var user = Login(value.email, value.password);
            if (user == null)
            {
                return Json(new
                {
                    success = false
                });
            }
            else
            {
                return Json(new
                {
                    success = true,
                    data = user
                });
            }
        }
        
        public User Login(string username, string password)
        {
            var user = _db.Users.SingleOrDefault(u => username.Equals(u.email, StringComparison.OrdinalIgnoreCase) && u.password == password);
            if (user != null)
            {
                user.token = Guid.NewGuid().ToString("N");
                _db.SaveChanges();
                return user;
            }
            return null;
        }

        public int Create(User user)
        {
            // Are there already a user with the email address
            if (_db.Users.Any(u => u.email != null && u.email.Equals(user.email, StringComparison.OrdinalIgnoreCase)))
            {
                throw new TedExeption(ExceptionCodes.UserExist);
            }

            NeuterUser(user);
            user.createdTime = DateTime.Now;
            _db.Add(user);
            _db.SaveChanges();
            return (int)user.id;
        }

        private void NeuterUser(User user)
        {
            user.isSuperUser = false;
            user.modifiedTime = DateTime.Now;
            //user.workspaceList = null;
        }

        protected override void Delete(int id)
        {
            var user = _db.Users.SingleOrDefault(u => u.id == id);
            if (user == null)
                throw new Exception($"User with Id {id} not found");
            base.Delete(id);
        }


    }
}
