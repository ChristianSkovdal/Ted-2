using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Reflection;

namespace Ted
{
    public class ControllerBase<T> : Controller
        where T: BaseEntity
    {
        protected readonly TedContext _db;

        public ControllerBase(TedContext db)
        {
            _db = db;
        }

        public new void Dispose()
        {
            if (_db != null)
                _db.Dispose();

            base.Dispose();
        }

        protected virtual void Update(object obj, JObject data)
        {
            foreach (var prop in data)
            {
                string propName = prop.Key;
                JToken propValue = prop.Value;

                PropertyInfo propInfo = obj.GetType().GetProperty(propName);
                if (propInfo == null)
                    throw new TedExeption(ExceptionCodes.Generic, $"Cannot get property {propName} for entity");
                var value = Convert.ChangeType(propValue.ToString(), propInfo.PropertyType);
                propInfo.SetValue(obj, value);
            }
        }

        protected virtual void Delete(int id)
        {
            var user = _db.Set<T>().SingleOrDefault(u => u.id == id);
            if (user == null)
                throw new Exception($"Entity with Id {id} not found");

            user.modifiedTime = DateTime.Now;
            user.deleted = true;

            _db.SaveChanges();
        }
    }
}
