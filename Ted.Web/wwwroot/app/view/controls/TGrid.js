Ext.define('Ted.view.controls.TGrid', {
    extend: 'Ext.Panel',
    xtype: 'tgrid',

    layout: 'card',

    items: [
        {
            xtype: 'crudview'
        }
    ]

});