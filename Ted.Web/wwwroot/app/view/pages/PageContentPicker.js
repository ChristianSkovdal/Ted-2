Ext.define('Ted.view.pages.PageContentPicker', {
    extend: 'Ext.Container',
    xtype: 'pagecontentpicker',

    controller: 'pagecontentpicker',
    viewModel: 'pagecontentpicker',

    showTools: true,
    layout: 'fit',

    items: [
        {
            xtype: 'panel',
            ui: 'light',
            shadow: true,
            reference: 'wrapper',
            margin: 20,

            layout: {
                type: 'card',
                animation: {
                    duration: 300,
                    easing: 'ease-out',
                    type: 'slide',
                    direction: 'left'
                }
            },            

            bind: {
                title: '{pageTitle}'
            },

            items: [
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: [
                        '->',
                        {
                            text: 'Cancel',
                            handler: 'onCancel'
                        },
                        {
                            text: 'Back',
                            handler: 'onBackClicked',
                            bind: {
                                hidden: '{!showBack}'
                            },
                        },
                        {
                            text: 'Add',
                            handler: 'onAdd',
                            bind: {
                                disabled: '{!record}',
                                hidden: '{!showAdd}'
                            },
                        },
                        {
                            text: 'Configure',
                            handler: 'onConfigure',
                            bind: {
                                disabled: '{!record}',
                                hidden: '{showAdd}'
                            },
                        }
                    ]
                },
                {
                    title: 'Add Content',
                    xtype: 'itemgallery',
                    contentData: [
                        {
                            name: 'Grid',
                            description: 'Massa ac sit vel ultrices, tellus lacinia commodo quis, excepteur nonummy facilisi netus risus netus, suspendisse etiam donec arcu fermentum, proin sit amet vitae egestas mi laoreet.',
                            icon: 'grid-icon.png',
                            picture: 'grid-img.png',
                            configUi: 'grid-config',
                            xtype: 'tgrid'
                        },
                        //{
                        //    name: 'Linked Grid',
                        //    description: 'Massa ac sit vel ultrices, tellus lacinia commodo quis, excepteur nonummy facilisi netus risus netus, suspendisse etiam donec arcu fermentum, proin sit amet vitae egestas mi laoreet.',
                        //    icon: 'grid-linked-icon.png',
                        //    picture: 'grid-linked-img.png'
                        //},
                        //{
                        //    name: 'Pivot Grid',
                        //    description: 'Massa ac sit vel ultrices, tellus lacinia commodo quis, excepteur nonummy facilisi netus risus netus, suspendisse etiam donec arcu fermentum, proin sit amet vitae egestas mi laoreet.',
                        //    icon: 'pivot-icon.png',
                        //    picture: 'pivot-img.png'
                        //},
                        //{
                        //    name: 'Item View',
                        //    description: 'Massa ac sit vel ultrices, tellus lacinia commodo quis, excepteur nonummy facilisi netus risus netus, suspendisse etiam donec arcu fermentum, proin sit amet vitae egestas mi laoreet.',
                        //    icon: 'itemview-icon.png',
                        //    picture: 'itemview-img.png',
                        //    config: 'itemview-config'
                        //},
                        //{
                        //    name: 'Form',
                        //    description: 'Massa ac sit vel ultrices, tellus lacinia commodo quis, excepteur nonummy facilisi netus risus netus, suspendisse etiam donec arcu fermentum, proin sit amet vitae egestas mi laoreet.',
                        //    icon: 'form-icon.png',
                        //    picture: 'form-img.png'
                        //},
                        //{
                        //    name: 'Html Page',
                        //    description: 'Massa ac sit vel ultrices, tellus lacinia commodo quis, excepteur nonummy facilisi netus risus netus, suspendisse etiam donec arcu fermentum, proin sit amet vitae egestas mi laoreet.',
                        //    icon: 'html-icon.png',
                        //    picture: 'html-img.png'
                        //},
                        {
                            name: 'Vertical Layout',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                            icon: 'vl-icon.png',
                            picture: 'vl-img.png',
                            xtype: 'tverticallayout'
                        },
                        //{
                        //    name: 'Horizontal Layout',
                        //    description: 'Est mi duis suspendisse non curabitur, vel sollicitudin neque convallis ac consectetuer suspendisse.',
                        //    icon: 'hl-icon.png',
                        //    picture: 'hl-img.png'
                        //}
                    ]
                }

            ]
        }
    ]
});