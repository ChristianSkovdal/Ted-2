Ext.define('Ted.view.pages.WorkSpaceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workspacelist',


    control: {
        '*': {
            open: function (cmp, item) {
                let ws = this.getViewModel().get('workspace');
                this.redirectTo(ws.get('startPageId').toString());
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
            //case 'card':
            //    crud.showCardView();
            //    break;
            default:
                assert(false);
        }
    },

    initList() {
        let crud = this.getView().down('crudview');
        crud.showItemView();

        let store = Ext.create('Ext.data.Store', {

            fields: ['name'],

            data: [
                {
                    name: 'Banana',
                    image: '/images/ws.png',
                    startPageId: 123,
                    description: 'The LINQ expression where __username_0.Equals([u].email, OrdinalIgnoreCase) could not be translated and will be evaluated locally.'
                },
                {
                    name: 'Apple',
                    image: '/images/ws.png',
                    startPageId: 456,
                    description: 'could not be translated and will be evaluated locally'
                }
            ]
        });
        crud.setStore(store);
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

    testButtonClick() {

        let crud = this.getView().down('crudview');
        this.getViewModel().set('workspace', crud.getStore().getAt(1));

//        crud.setSelection();
        //crud.setItemTpl('<div class="dataview-item">' +
        //    '<img draggable="false" src="{image}" />' +
        //    '<div class="name">{name}</div>' +
        //    '<div class="name">{startPageId}</div>' +
        //    '</div>');
    }

});