using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted
{
    public class Page : BaseEntity
    {
        public string text { get; set; }

        public string iconCls { get; set; }

        public string json { get; set; }

		public int WorkspaceId { get; set; }

        public bool isPublic { get; set; }

        public virtual ICollection<Script> scripts { get; set; } = new List<Script>();
        
    }
}
