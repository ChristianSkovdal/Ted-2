using System;
using System.Linq;

namespace Ted
{
    public class AuthenticationHandler : IDisposable
    {
        protected readonly TedContext _db;

        public AuthenticationHandler(TedContext context)
        {
            _db = context;
        }
        public User Authenticate(string token)
        {
            return _db.Users.SingleOrDefault(u => u.token == token && !u.deleted);
        }

        public User Authenticate(string token, int userId)
        {
            var user = _db.Users.SingleOrDefault(u => u.token == token);
            if (user != null && (user.id == userId || user.isSuperUser))
                return user;
            return null;
        }

        public bool AuthenticateForTable(string token, string table)
        {
            //var tbl = _db.Tables.SingleOrDefault(t => t.name==table);
            //if (!tbl.isPublic)
            //{
            //    var user = Authenticate(token);
            //    if (user == null)
            //        return false;

            //    if (user.id != tbl.createdBy)
            //    {
            //        return false;
            //    }
            //}
            return true;
        }

        public bool IsSuperUser(string token)
        {
            return Authenticate(token, -1)!=null;
        }
        
        public User AuthenticateForWorkspace(string token, int workspaceId)
        {
            var user = Authenticate(token);
            if (user != null)
            {
                if (_db.Workspaces.Where(r => r.id == workspaceId).Any(r => r.UserId==user.id))
                {
                    return user;
                }
            }
            return null;
        }

        public void Dispose()
        {
            if (_db != null)
                _db.Dispose();
        }
    }
}
