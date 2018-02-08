Ext.define('Ted.view.controls.ItemGallery', {
    extend: 'Ext.Container',
    xtype: 'itemgallery',

    require: [
        'Ted.view.controls.CrudView',
    ],

    layout: 'hbox',
    contentData: null,

    listeners: {
        initialize: function (cmp) {

            let crudView = cmp.down('crudview');
            crudView.showItemView();

            let store = Ext.create('Ext.data.Store', {
                fields: ['name', 'description', 'picture', 'icon'],
                data: cmp.contentData
            });
            crudView.setStore(store);
        }
    },

    items: [
        {
            xtype: 'crudview',
            activeItem: 1,
            bind: {
                selection: '{record}'
            },

            itemTpl: '<div class="dataview-item">' +
            '<img draggable="false" src="/images/{icon}" />' +
            '<div class="name">{name}</div>' +
            '</div>',

            flex: 2
        },
        {
            xtype: 'container',
            flex: 1,
            tpl: Ext.create('Ext.XTemplate',
                `<tpl if="record">
                        <div class="item-description">
                            <div class="header">
                                {[values.record.getData().name]}
                            </div>
                            <div style="background: transparent url(/images/{[values.record.getData().picture]}.png) no-repeat;margin-top: 60px;">
                                {[values.record.getData().description]}
                            </div> 
                        </div>
                        </tpl>`
            ),
            bind: {
                data: {
                    record: '{record}'
                },
            }
        }
    ]
});