Ext.define('Ted.view.authentication.AuthBase', {
    extend: 'Ext.Panel',

    controller: 'auth',
    //viewModel:'auth',

    requires: [
        'Ext.layout.VBox',
        'Ted.view.authentication.AuthModel'
    ],

    

    baseCls: 'auth-locked',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});
