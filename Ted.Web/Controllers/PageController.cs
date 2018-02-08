using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;


namespace Ted
{
    [Route("api/[controller]")]
    public class PageController : ControllerBase<Page>
    {
        public PageController(TedContext db, AuthenticationHandler auth)
            : base(db, auth)
        {
        }

        [HttpGet("{token}/{id}")]
        public JsonResult GetPage(string token, int id)
        {
            var page = _db.Pages.SingleOrDefault(r => r.id==id);
            if (page == null)
            {
                return Json(new
                {
                    // Send to login page and reset pageid hash
                    error = ExceptionCodes.PageNotFound,
                    success = false
                });
            }

            var user = _auth.Authenticate(token);
            if (!page.isPublic)
            {                
                if (user == null)
                {
                    return Json(new
                    {
                        error = ExceptionCodes.Reauthenticate,
                        success = false 
                    });
                }
            }

            var workspace = _db.Workspaces.SingleOrDefault(r => r.id == page.WorkspaceId);
            if (workspace == null)
                throw new TedExeption(ExceptionCodes.WorkspaceNotFound);

            if (!page.isPublic)
            {
                if (!user.myWorkspaces.Any(r => workspace.id == r.id))
                    throw new TedExeption(ExceptionCodes.Authentication);
            }

            workspace.pages = null;

            return Json(new
            {
                success = true,
                data = page
            });
        }

        //[HttpPost("{token}")]
        //public JsonResult AddWorkspace(string token, [FromBody] Workspace value)
        //{
        //    var user = _auth.Authenticate(token);

        //    if (string.IsNullOrEmpty(value.name))
        //        throw new ArgumentException(nameof(value.name));

        //    value.createdBy = user.id;
        //    value.createdTime = DateTime.Now;

        //    var page = new Page
        //    {
        //        createdBy = user.id,
        //        createdTime = DateTime.Now,
        //        //json = File.ReadAllText(Path.Combine("templates", "welcome_template.json")),
        //        text = "Welcome",
        //        iconCls = "x-fa fa-home",
        //        isPublic = false
        //    };

        //    value.pages.Add(page);

        //    user.myWorkspaces.Add(value);
        //    _db.Add(value);
        //    _db.SaveChanges();

        //    value.startPageId = page.id;

        //    _db.SaveChanges();

        //    return Json(new
        //    {
        //        success = true,
        //        data = value
        //    });
        //}

        [HttpPut("{token}/{id}")]
        public void UpdatePage(string token, int id, [FromBody]JObject value)
        {
            var page = _db.Pages.SingleOrDefault(r => r.id==id);
            if (page==null)
                throw new TedExeption(ExceptionCodes.PageNotFound);

            var ws = _db.Workspaces.SingleOrDefault(r => r.id==page.WorkspaceId);
            var user = _auth.AuthenticateForWorkspace(token, ws.id);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            Update(page, value);

            page.modifiedTime = DateTime.Now;
            page.modifiedBy = user.id;

            _db.SaveChanges();
            
        }


        //[HttpDelete("{token}/{id}")]
        //public void DeleteWorkspace(string token, int id)
        //{
        //    var user = _auth.AuthenticateForWorkspace(token, id);
        //    if (user == null)
        //        throw new TedExeption(ExceptionCodes.Authentication);

        //    var ws = _db.Workspaces.SingleOrDefault(r => r.id==id);

        //    ws.modifiedTime = DateTime.Now;
        //    ws.modifiedBy = user.id;
        //    ws.deleted = true;

        //    foreach (var page in ws.pages)
        //    {
        //        page.deleted = true;
        //    }

        //    _db.SaveChanges();
        //}
    }
}
