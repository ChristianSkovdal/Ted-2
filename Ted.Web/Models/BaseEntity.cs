using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            createdTime = DateTime.Now;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }

        public int? modifiedBy { get; set; }

        public int? createdBy { get; set; }

        public DateTime? modifiedTime { get; set; }

        public DateTime? createdTime { get; set; }

        public bool deleted { get; set; }
    }
}
