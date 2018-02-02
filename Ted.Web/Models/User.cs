using System.Collections.Generic;

namespace Ted
{
    public class User : BaseEntity
    {
		//public User()
		//{
		//}
        public string fullName { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public bool isSuperUser { get; set; } = false;

        public string token { get; set; }

        // Workspaces created by me
        //public  ICollection<Workspace> myWorkspaces { get; set; }

        //// List of workspaces I use
        //public string workspaceList { get; set; }

    }
}
