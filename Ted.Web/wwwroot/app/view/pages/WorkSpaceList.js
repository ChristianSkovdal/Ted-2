Ext.define('Ted.view.pages.WorkspaceList', {
    extend: 'Ext.Container',
    xtype: 'workspacelist',

    require: [
        'Ted.view.controls.CrudView',
        'Ext.SegmentedButton',
        'Ted.view.dialogs.NewWorkspaceDialog'
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
                //{
                //    xtype: 'cmdbutton',
                //    iconCls: 'x-fa fa-plus-circle',
                //    handler: 'testButtonClick',
                //    bind: {
                //        text: '{stuff}'
                //    }
                //    //text: 'Test'
                //},
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
                        disabled: '{!workspace}',
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
                        disabled: '{!workspace}',
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

            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'crudview',
                    bind: {
                        selection: '{workspace}'
                    },

                    itemTpl: '<div class="workspace-item">' +
                    '<img draggable="false" src="/images/ws.png" />' +
                    '<div class="name">{name}</div>' +
                    //'<div class="name">{startPageId}</div>' +
                    '</div>',

                    nameContext: 'Workspaces',
                    alreadyExistErrorMsg: 'A workspace with the name {0} already exist',
                    dialogType: 'newworkspacedlg',
                    flex: 2
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'infoView',
          
                    tpl: Ext.create('Ext.XTemplate', 
                        '<div class="workspacelist">' +
                            '<tpl if="!ws">' +
                                '<div class="empty">Select a workspace to get details<br/>' +
                        //'or <a href="javascript:void(0);" id="createNew">create a new one</a></div>' +
                                'or <a href="#" id="createNew">create a new one</a></div>' +
                            '<tpl else>' +
                                '<div class="header">{[values.ws.getData().name]}</div>' +
                                '<div>{[values.ws.getData().description]}</div>' +
                            '</tpl>' +
                        '</div>'),
                    bind: {
                        data: {
                            ws: '{workspace}'
                        },                        
                    }
                }
            ]
        }
    ]
});