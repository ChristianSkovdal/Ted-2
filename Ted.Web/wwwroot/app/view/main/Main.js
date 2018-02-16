Ext.define('Ted.view.main.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',

    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View',
        'Ted.view.pages.WorkspaceList'
    ],

    controller: 'main',
    viewModel: 'main',
    navigationBar: false,
    innerCls: 'main-view',
    userCls: 'main-container',

    //platformConfig: {
    //    desktop: {
    //    },
    //    '!desktop': {
    //    },
    //},

    items: [
        {
            xtype: 'cmdbar',
            bind: {
                hidden: '{!showAuthoringTools}'
            },
            items: [
                {
                    xtype: 'logo',
                    reference: 'logo'
                },
                {
                    ui: 'header',
                    iconCls: 'x-fa fa-bars',
                    margin: '0 0 0 10',
                    handler: 'onToggleNavigationSize'
                },
                '->',
            ]
        },
        //{
        //    xtype: 'treelist',
        //    reference: 'navigationTree',
        //    scrollable: true,
        //    ui: 'nav',
        //    store: 'NavigationTree',
        //    expanderFirst: false,
        //    expanderOnly: false,
        //    docked: 'left',
        //    userCls: 'main-nav-container',
        //    reference: 'navigationTree',
        //    layout: 'fit',
        //    listeners: {
        //        //itemclick: 'onNavigationItemClick',
        //        //selectionchange: 'onNavigationTreeSelectionChange'
        //    },
        //    bind: {
        //        hidden: '{!showAuthoringTools}'
        //    }

        //},
       {
        xtype: 'container',
        docked: 'left',
        userCls: 'main-nav-container',
        reference: 'navigation',
        layout: 'fit',
           bind: {
                hidden: '{!showAuthoringTools}'
            },
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
            }
        }]
    }
    ]

});
