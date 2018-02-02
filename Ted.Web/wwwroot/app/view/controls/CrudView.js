Ext.define('Ted.view.controls.CrudView', {
    extend: 'Ext.Container',
    xtype: 'crudview',

    controller: 'crudview',
    controller: 'crudview',

    config: {
        nameContext: 'Items',
        alreadyExistErrorMsg: 'An item with that name already exist',
        nameProperty: 'name'
    },

    items: [
        {
            xtype: 'cmdbar',
            items: [
                {
                    xtype: 'logo'
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-plus-circle',
                    handler: 'addItemButtonClick',
                    text: 'Add',
                    width: 100
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-minus-circle',
                    handler: 'deleteItemButtonClick',
                    text: 'Remove',
                    bind: {
                        disabled: '{!selectedItem}',
                    },
                    width: 100
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-refresh',
                    handler: 'refreshItemButtonClick',
                    text: 'Refresh',
                    width: 100

                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-check-circle ',
                    handler: 'openItemButtonClick',
                    text: 'Open',
                    bind: {
                        disabled: '{!selectedItem}',
                    },
                    width: 100
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',

            items: [
                {
                    xtype: 'dataview',
                    inline: true,
                    ui: 'default',
                    flex: 2,
                    margin: 10,
                    bind: {
                        store: '{itemStore}',
                        selection: '{selectedItem}'
                    },
                    cls: 'dataview-multisort-item',


                    itemTpl: '<div class="dataview-multisort-item">' +
                    '<img draggable="false" src="/images/ws.png" />' +
                    '<div class="name">{name}</div>' +
                    '</div>',

                    listeners: {
                        childdoubletap: 'onItemDblTap',
                        //painted: 'onItemViewPainted'

                    },

                    //plugins: {
                    //    dataviewtip: {
                    //        align: 'tl-bl',
                    //        maxHeight: 200,
                    //        width: 300,
                    //        scrollable: 'y',
                    //        delegate: '.img',
                    //        allowOver: true,
                    //        anchor: true,
                    //        bind: '{record}',
                    //        cls: 'dataview-multisort-item',
                    //        //tpl: '<strong>Description</strong>''<div class="info">{description}</div>'
                    //        //'<strong>Position</strong><div class="info">{position}</div>' +
                    //        //'<strong>Bio</strong><div class="info">{bio:substr(0, 100)}</div>'
                    //    }
                    //}
                },
                {
                    margin: 30,

                    xtype: 'panel',
                    bind: {
                        html: '<div class="ws-description">About</div>' +
                        '<p>{workspaceInfo.description}</p>' +
                        '<p><strong>Created:</strong> {workspaceInfo.created}</p>'
                    },
                    flex: 1,
                    //bind: {
                    //    hidden: '{!selectedItem}'
                    //},
                }
            ]
        }

    ]
});

