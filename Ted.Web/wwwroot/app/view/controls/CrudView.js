Ext.define('Ted.view.controls.CrudView', {
    extend: 'Ext.Container',
    xtype: 'crudview',

    controller: 'crudview',
    controller: 'crudview',


    config: {
        nameContext: 'Items',
        alreadyExistErrorMsg: 'An item with that name already exist',
        nameProperty: 'name',        
    },
    
    setStore(s) {
        this.getController().getViewModel().set('mainStore', s);
    },

    getStore() {
        return this.getController().getViewModel().get('mainStore');
    },

    showCardView() {
        
    },

    showGridView() {
        this.setActiveItem(this.down('grid'));
    },

    showItemView() {
        this.setActiveItem(this.down('dataview'));
    },

    layout: 'card',

    items: [
        {
            xtype: 'grid',
            columns: [
                {
                    text: 'Name',
                    dataIndex: 'name'
                }
            ],
            reference: 'grid',
            bind: {
                selection: '{selectedItem}'
            },
        },
        {
            xtype: 'dataview',
            inline: true,
            ui: 'default',
            flex: 2,
            reference: 'item',
            margin: 10,
            bind: {
                selection: '{selectedItem}'
            },
            cls: 'dataview-item',

            itemTpl: '<div class="dataview-item">' +
            '<img draggable="false" src="{image}" />' +
            '<div class="name">{name}</div>' +
            '</div>',

            listeners: {
                childdoubletap: 'onItemDblTap'
            }
        }
    ],

    setItemTemplate(tpl) {
        this.down('dataview').setItemTpl(tpl);
    }
});

