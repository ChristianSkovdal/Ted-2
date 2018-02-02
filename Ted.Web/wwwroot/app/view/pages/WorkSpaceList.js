Ext.define('Ted.view.controls.WorkspaceList', {
    extend: 'Ext.Container',
    xtype: 'workspacelist',

    //layout: 'fit',

    require: [
        'Ted.view.controls.CrudView'
    ],

    listeners: {
        'open': function (cmp, ws) {

            this.redirectTo(ws.get('startPageId'));
        }
    },

    items: [
        {
            xtype: 'crudview',
            config: {

                nameContext: 'Workspaces',

                alreadyExistErrorMsg: 'A workspace with that name already exist',


                dialogType: 'newworkspacedlg',
                store: {

                    fields: ['name'],

                    data: [
                        {
                            name: 'Banana',
                            startPageId: 123
                        },
                        {
                            name: 'Apple',
                            startPageId: 456
                        }
                    ]

                }
            }
        }
    ]
});