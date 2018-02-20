namespace Ted
{
    public class Table : BaseEntity
    {
        public string name { get; set; }

        public int UserId { get; set; }

        public bool isPublic { get; set; }
    }
}