Ext.define('Ted.view.authentication.Register', {
    extend: 'Ted.view.authentication.AuthBase',
    xtype: 'register',

    requires: [
        'Ext.field.Checkbox',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.layout.HBox'
    ],

    items: [{
        xtype: 'panel',
        bodyPadding: 20,
        defaults: {
            margin: '0 0 10 0'
        },
        items: [{
            xtype: 'component',
            html: 'Create an Account'
        }, {
            xtype: 'textfield',
            placeholder: 'Full Name',
            bind: {
                value: '{fullname}'
            }
        },
        //    {
        //    xtype: 'textfield',
        //    placeholder: 'Username'
        //},
        {
            xtype: 'emailfield',
            placeholder: 'Email',
            bind: {
                value: '{email}'
            }
        }, {
            xtype: 'passwordfield',
            placeholder: 'Password',
            bind: {
                value: '{password}'
            }
        },
        //{
        //    xtype: 'checkboxfield',
        //    boxLabel: 'I agree to the terms & conditions'
        //},
        {
            xtype: 'button',
            text: 'Signup',
            iconAlign: 'right',
            iconCls: 'x-fa fa-user-plus',
            ui: 'confirm',
            width: '100%',
            handler: 'registerUser'
        },
            //{
            //    xtype: 'button',
            //    margin: 0,
            //    text: 'Login with Facebook',
            //    iconAlign: 'right',
            //    iconCls: 'x-fa fa-facebook',
            //    ui: 'facebook',
            //    width: '100%',
            //    handler: 'goToDashboard'
            //}
        ]
    }]
});
