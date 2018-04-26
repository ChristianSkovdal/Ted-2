Ext.define('Ted.view.controls.FlexView', {
    extend: 'Ext.Panel',
    xtype: 'flexview',

    controller: 'flexview',

    ui: 'light',
    shadow: true,
    margin: 20,
    layout: 'fit',

    getFields() {
        return this.downsafe('crudview').getFields();
    },
    
    items: [
        {
            xtype: 'cmdbar',

            items: [
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
                        disabled: '{!selection}',
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
                        disabled: '{!selection}',
                    },
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-clone',
                    handler: 'duplicateRowButtonClick',
                    text: 'Duplicate',
                    bind: {
                        disabled: '{!selection}',
                    },
                },
                {
                    xtype: 'cmdbutton',
                    iconCls: 'x-fa fa-cloud-upload',
                    handler: 'importButtonClick',
                    text: 'Import'
                },
                '->',
                {
                    xtype: 'segmentedbutton',
                    margin: '0 16 0 0',
                    items: [
                        {
                            value: 'showItemView',
                            iconCls: 'x-fa fa-desktop',
                            handler: 'onSwitchToView',
                        },
                        {
                            value: 'showGridView',
                            iconCls: 'x-fa fa-tablet',
                            pressed: true,
                            handler: 'onSwitchToView'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'crudview',

            bind: {
                selection: '{selection}'
            },

            //itemTpl: '<div class="workspace-item">' +
            //'<img draggable="false" src="/images/ws.png" />' +
            //'<div class="name">{name}</div>' +
            ////'<div class="name">{startPageId}</div>' +
            //'</div>',

            nameContext: 'Rows',
            //alreadyExistErrorMsg: 'A workspace with the name {0} already exist',
        }
    ]

});