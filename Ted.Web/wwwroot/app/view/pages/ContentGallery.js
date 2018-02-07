Ext.define('Ted.view.pages.ContentGallery', {
    extend: 'Ext.Panel',
    xtype: 'contentgallery',

    require: [
        'Ted.view.controls.CrudView',
    ],

    controller: 'contentgallery',
    layout: 'fit',


    items: [
        {

            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'crudview',
                    activeItem: 1,
                    bind: {
                        selection: '{contentType}'
                    },

style:'background:red;',

                    itemTpl: '<div class="dataview-item">' +
                    '<img draggable="false" src="/images/{icon}" />' +
                    '<div class="name">{name}</div>' +
                    '</div>',

                    flex: 2
                },
                {
                    xtype: 'container',
                    flex: 1,
                    //style: 'background:red;',
                    tpl: Ext.create('Ext.XTemplate',
                        `<div class="item-description">
                            <div class="header">
                                {[values.contentType.getData().name]}
                            </div>
                            <div style="background: transparent url(/images/{[values.contentType.getData().picture]}.png) no-repeat">
                                {[values.contentType.getData().description]}
                            </div> 
                        </div>`),
                    bind: {
                        data: {
                            contentType: '{contentType}'
                        },
                    }
                }
            ]
        }
    ]
});