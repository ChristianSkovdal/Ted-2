Ext.define('Ted.view.pages.WorkspaceList', {
    extend: 'Ext.Container',
    xtype: 'workspacelist',

    require: [
        'Ted.view.controls.CrudView',
        'Ext.SegmentedButton'

    ],

    controller: 'workspacelist',

    layout: 'fit',

    items: [
        {
            xtype: 'cmdbar',
            items: [
                {
                    xtype: 'logo',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-plus-circle',
                    handler: 'addButtonClick',
                    text: 'Add'
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-minus-circle',
                    handler: 'deleteButtonClick',
                    text: 'Remove',
                    bind: {
                        disabled: '{!selectedItem}',
                    }
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-refresh',
                    handler: 'refreshButtonClick',
                    text: 'Refresh',
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-check-circle ',
                    handler: 'openButtonClick',
                    text: 'Open',
                    bind: {
                        disabled: '{!selectedItem}',
                    },
                },
                '->',
                {
                    xtype: 'segmentedbutton',
                    margin: '0 16 0 0',
                    items: [{
                        value: 'item',
                        iconCls: 'x-fa fa-desktop',
                        handler: 'onSwitchToView'
                    }, {
                        value: 'grid',
                        iconCls: 'x-fa fa-tablet',
                        pressed: true,
                        handler: 'onSwitchToView'
                    }]
                }
            ]
        },
        {
            xtype: 'crudview',
            config: {

                nameContext: 'Workspaces',

                alreadyExistErrorMsg: 'A workspace with that name already exist',

                dialogType: 'newworkspacedlg',
            }
        }
    ]
});