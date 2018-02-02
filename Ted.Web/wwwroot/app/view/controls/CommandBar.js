Ext.define('Ted.view.controls.CommandBar', {
    extend: 'Ext.Toolbar',
    xtype: 'cmdbar',

    requires: [
        'Ext.Button',
        'Ext.Img',
        'Ext.SegmentedButton'
    ],

    docked: 'top',
    userCls: 'main-toolbar',
    shadow: true

});