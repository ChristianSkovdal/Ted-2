Ext.define('Ted.model.Workspace', {
    extend: 'Ext.data.Model',

	fields: [
		{
			name: 'name'
		},
        {
            name: 'description'
        },
        {
            name: 'navigation'
        },
        {
            name: 'startupCode'
        },
        {
            name: 'shutdownCode'
        },
        {
            name: 'navigation'
        },
        {
            name: 'startPageId',
            type: 'int'
        },
        //{
        //    name: 'id',
        //    type: 'int'
        //},
    ]
});
