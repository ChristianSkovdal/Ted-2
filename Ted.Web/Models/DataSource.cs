using System.Collections.Generic;

namespace Ted
{
    public class DataSource : BaseEntity
    {
        public string name { get; set; }

        public virtual ICollection<User> users{ get; set; } = new List<User>();
    }
}
