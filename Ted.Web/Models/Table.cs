using System.ComponentModel.DataAnnotations.Schema;

namespace Ted
{
    public class Table : BaseEntity
    {
        public string name { get; set; }

        public int UserId { get; set; }

        public bool isPublic { get; set; }

        [NotMapped]
        public ColumnDTO column { get; set; }
    }
}