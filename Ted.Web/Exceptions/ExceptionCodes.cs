namespace Ted
{
    public enum ExceptionCodes : int
    {
        Generic = 0,

        Authentication = 100,
        NotSuperUser=101,
        UserExist = 102,
		PageNotFound = 103,
        TableNotFound = 104,
        ColumnExist = 105,
        UnableToParseArgument = 106,
        InvalidArgument = 107,
        WorkspaceNotFound = 103,
        Reauthenticate = 108,
        DataIntegrityError = 109,
    }
}
