Ext.define('Ted.view.pages.PageContentGallery', {
    extend: 'Ext.Container',
    xtype: 'pagecontentgallery',

    controller: 'pagecontentgallery',
    title: 'Page Content',

    showTools: true,
    //margin: '20 60 60 20',
    shadow: true,
    ui: 'light',
    layout: 'fit',
    userCls: 'big-50 small-100 dashboard-item',
    layout:'fit',

    viewModel: {
        contentType: null
    },

    items: [
        {
            xtype: 'contentgallery',

            contentData: [
                {
                    name: 'Vertical Layout',
                    description: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    icon: 'vl-icon.png',
                    picture: 'vl-img.png'
                },
                {
                    name: 'Horizontal Layout',
                    description: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    icon: 'hl-icon.png',
                    picture: 'hl-img.png'
                },
                {
                    name: 'Grid',
                    description: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    icon: 'grid-icon.png',
                    picture: 'grid-img.png'
                },
            ]


        }
    ]
});