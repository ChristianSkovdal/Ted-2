using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ted
{
    public class Workspace : BaseEntity
    {
        public string name { get; set; }

        public string description { get; set; }

        public string startupCode { get; set; }

        public string shutdownCode { get; set; }

        public virtual ICollection<Page> pages { get; set; } = new List<Page>();

        public int startPageId { get; set; }

        public int UserId { get; set; }
    }
}
