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

    innerCls: 'main-view',

    platformConfig: {
        desktop: {
            //title: 'Test',            
        },
        '!desktop': {
            //title: 'Demo',
            //userCls: 'main-container'
        },

    },

    items: [
        //{
        //    xtype: 'panel',
        //    cls: 'main-view',
        //    height: 500,
        //    //bodyStyle:'background: red;'
        //    header: {
        //        cls: 'configurationHeader',
        //        title: 'EVENT SUBSCRIPTION'
        //    }
        //},
        {
            xtype: 'maintoolbar',
            docked: 'top',
            userCls: 'main-toolbar',
            shadow: true
        }, {
            xtype: 'container',
            docked: 'left',
            userCls: 'main-nav-container',
            reference: 'navigation',
            layout: 'fit',
            items: [{
                xtype: 'treelist',
                reference: 'navigationTree',
                scrollable: true,
                ui: 'nav',
                store: 'NavigationTree',
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    //itemclick: 'onNavigationItemClick',
                    //selectionchange: 'onNavigationTreeSelectionChange'
                },
                //store: {

                //    storeId: 'NavigationTree',

                //    fields: [{
                //        name: 'text'
                //    }],

                //    root: {
                //        expanded: true,
                //        children: [
                //            {
                //                text: 'Dashboard',
                //                iconCls: 'x-fa fa-desktop',
                //                //rowCls: 'nav-tree-badge nav-tree-badge-new',
                //                viewType: 'admindashboard',
                //                routeId: 'dashboard', // routeId defaults to viewType
                //                leaf: true
                //            },
                //            {
                //                text: 'Health Check Details',
                //                iconCls: 'x-fa fa-send',
                //                //rowCls: 'nav-tree-badge nav-tree-badge-hot',
                //                viewType: 'email',
                //                leaf: true
                //            }
                //        ]
                //    }

                //}
            }]
        }]

});
