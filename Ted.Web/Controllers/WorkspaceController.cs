using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Ted
{
    [Route("api/[controller]")]
    public class WorkspaceController : ControllerBase<Workspace>
    {
        public WorkspaceController(TedContext db, AuthenticationHandler auth)
            : base(db, auth)
        {
        }

        [HttpGet("{token}")]
        public JsonResult GetAllForUser(string token)
        {
            var user = _auth.Authenticate(token);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _db.Workspaces.Where(r => r.UserId == user.id && !r.deleted)
            });
        }

        [HttpGet("{token}/{id}")]
        public JsonResult GetOne(string token, int id)
        {
            var user = _auth.AuthenticateForWorkspace(token, id);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _db.Workspaces.SingleOrDefault(r => r.id == id && !r.deleted)
            });
        }

        [HttpPost("{token}")]
        public JsonResult AddWorkspace(string token, [FromBody] Workspace value)
        {
            var user = _auth.Authenticate(token);

            if (string.IsNullOrEmpty(value.name))
                throw new ArgumentException(nameof(value.name));

            value.createdBy = user.id;
            value.createdTime = DateTime.Now;

            var page = new Page
            {
                createdBy = user.id,
                createdTime = DateTime.Now,
                //json = File.ReadAllText(Path.Combine("templates", "welcome_template.json")),
                text = "Welcome",
                iconCls = "x-fa fa-home",
                isPublic = false,
            };
            
            value.pages.Add(page);

            user.myWorkspaces.Add(value);
            _db.Add(value);
            _db.SaveChanges();

            value.navigation = JsonConvert.SerializeObject(new Page[] { page });
            value.startPageId = page.id;

            _db.SaveChanges();

            return Json(new
            {
                success = true,
                data = value
            });
        }

        [HttpPut("{token}/{id}")]
        public void UpdateWorkspace(string token, int id, [FromBody]JObject value)
        {
            var user = _auth.AuthenticateForWorkspace(token, id);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            var ws = _db.Workspaces.SingleOrDefault(u => u.id == id);

            Update(ws, value);

            ws.modifiedTime = DateTime.Now;
            ws.modifiedBy = user.id;

            _db.SaveChanges();
        }


        [HttpDelete("{token}/{id}")]
        public void DeleteWorkspace(string token, int id)
        {
            var user = _auth.AuthenticateForWorkspace(token, id);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            var ws = _db.Workspaces.SingleOrDefault(r => r.id==id);

            ws.modifiedTime = DateTime.Now;
            ws.modifiedBy = user.id;
            ws.deleted = true;

            foreach (var page in ws.pages)
            {
                page.deleted = true;
            }

            _db.SaveChanges();
        }
    }
}
