Ext.define('Ted.view.controls.Logo', {
    extend: 'Ext.Container',
    xtype: 'logo',

    userCls: 'main-logo',
    bind: {
        html: '{logoText}'

    }
});