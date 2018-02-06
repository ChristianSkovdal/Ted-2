Ext.define('Ted.view.pages.WorkSpaceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workspacelist',


    control: {
        '*': {
            open: function (cmp, item) {
                this.redirectTo(item.get('startPageId').toString());
            }
        },
        'workspacelist': {
            initialize: 'initList'

        }

    },

    onSwitchToView(btn) {
        let crud = this.getView().down('crudview');

        switch (btn.getValue()) {
            case 'grid':
                crud.showGridView();
                break;
            case 'item':
                crud.showItemView();
                break;
            case 'card':
                crud.showCardView();
                break;
            default:
                assert(false);
        }
    },

    initList() {
        let crud = this.getView().down('crudview');
        crud.setActiveItem(1);
        crud.setStore(Ext.create('Ext.data.Store', {

            fields: ['name'],

            data: [
                {
                    name: 'Banana',
                    image: '/images/ws.png',
                    startPageId: 123
                },
                {
                    name: 'Apple',
                    image: '/images/ws.png',
                    startPageId: 456
                }
            ]
        }));


        crud.setItemTemplate('<div class="dataview-item">' +
            '<img draggable="false" src="{image}" />' +
            '<div class="name">{name}</div>' +
            '<div class="name">{startPageId}</div>' +
            '</div>');
    },

    addButtonClick() {
        let crud = this.getView().down('crudview');
        crud.getController().addButtonClick();
    },

    refreshButtonClick() {
        let crud = this.getView().down('crudview');
        crud.getController().refreshButtonClick();
    },

    openButtonClick() {
        let crud = this.getView().down('crudview');
        crud.getController().openButtonClick();
    },

    deleteButtonClick() {
        let crud = this.getView().down('crudview');
        crud.getController().deleteButtonClick();
    },

});