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

        [HttpPost("{token}")]
        public void CreateTable(string token, [FromBody] Table value)
        {
            var user = _auth.Authenticate(token);

            // Does table exist as a database table
            using (var tbl = new FlexTable(_connStr, value.name))
            {
                if (tbl.TableExist() || _db.Tables.Any(r => r.name == value.name))
                {
                    throw new TedExeption(ExceptionCodes.TableExist, value.name);
                }
                else
                { 
                    tbl.CreateTable();

                    // Add to db                    
                    user.myTables.Add(new Table
                    {
                        name = value.name,
                        isPublic = false,
                    });

                    _db.SaveChanges();

                    // Add the columns specified
                    AddColumn(token, value.name, value.column);
                }
            }
        }


        [HttpPost("column/{token}/{table}")]
        public void AddColumn(string token, string table, [FromBody] ColumnDTO value)
        {
            // Make the unique name based on the user
            var user = _auth.AuthenticateForTable(token, table);

            // Does table exist as a database table
            using (var tbl = new FlexTable(_connStr, table))
            {
                if (!tbl.ColumnExist(value.dataIndex))
                {
                    tbl.CreateColumn(value.dataIndex, value.type, true);
                }
            }
            
        }

    }
}
