Ext.define('Ted.view.main.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',

    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View',
    ],

    controller: 'main',
    viewModel: 'main',

    navigationBar: false,
    
    userCls: 'main-container',

    platformConfig: {
        desktop: {
            //title: 'Test',
            
        },
        '!desktop': {
            //title: 'Demo',
            //userCls: 'main-container'
        },

    },

    //items: [{
    //    xtype: 'maintoolbar',
    //    docked: 'top',
    //    userCls: 'main-toolbar',
    //    shadow: true
    //}, {
    //    xtype: 'container',
    //    docked: 'left',
    //    userCls: 'main-nav-container',
    //    reference: 'navigation',
    //    layout: 'fit',
    //    items: [{
    //        xtype: 'treelist',
    //        reference: 'navigationTree',
    //        scrollable: true,
    //        ui: 'nav',
    //        store: 'NavigationTree',
    //        expanderFirst: false,
    //        expanderOnly: false,
    //        listeners: {
    //            //itemclick: 'onNavigationItemClick',
    //            //selectionchange: 'onNavigationTreeSelectionChange'
    //        }
    //    }]
    //}]
    

    //defaults: {
    //    tab: {
    //        iconAlign: 'top'
    //    }
    //},

    //tabBarPosition: 'bottom',

    //items: [
    //    // TODO - Replace the content of this view to suit the needs of your application.
    //    {
    //        title: 'Home',
    //        iconCls: 'x-fa fa-home',
    //        layout: 'fit',
    //        // The following grid shares a store with the classic version's grid as well!
    //        items: [{
    //            xtype: 'mainlist'
    //        }]
    //    },{
    //        title: 'Users',
    //        iconCls: 'x-fa fa-user',
    //        bind: {
    //            html: '{loremIpsum}'
    //        }
    //    },{
    //        title: 'Groups',
    //        iconCls: 'x-fa fa-users',
    //        bind: {
    //            html: '{loremIpsum}'
    //        }
    //    },{
    //        title: 'Settings',
    //        iconCls: 'x-fa fa-cog',
    //        bind: {
    //            html: '{loremIpsum}'
    //        }
    //    }
    //]
});
