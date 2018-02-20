using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Ted
{
    [Route("api/[controller]")]
    public class TableController : ControllerBase<Table>
    {
        public TableController(TedContext db, AuthenticationHandler auth, IConfiguration config)
            : base(db, auth, config)
        {
        }

        [HttpPost("column/{token}/{table}")]
        public void AddColumn(string token, string table, [FromBody] ColumnDTO value)
        {
            // Make the unique name based on the user

            // Does table exist as a database table
            //using (var tbl = new FlexTable(_connStr, table))
            //{
            //    if (!tbl.TableExist())
            //    {
            //        tbl.CreateTable();

            //        if (_db.Tables.Any(r => r.name == table))
            //            throw new TedExeption(ExceptionCodes.DataIntegrityError, table);

            //        // Add to db
            //        var user = _auth.Authenticate(token);
            //        user.myTables.Add(new Table {
            //            name = table,
            //            isPublic = false,
            //        });
            //    }
            //}



            //var user = _auth.AuthenticateForTable(token, table);


        }

    }
}
