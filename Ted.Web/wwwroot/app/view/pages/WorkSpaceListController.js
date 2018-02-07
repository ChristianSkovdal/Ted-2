Ext.define('Ted.view.pages.WorkSpaceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workspacelist',


    control: {
        '*': {
            open: function (cmp, item) {
                let ws = this.getViewModel().get('workspace');
                this.redirectTo(ws.get('startPageId').toString(), true);
            }
        },
        'workspacelist': {
            initialize: 'initList'
        },
        '#infoView': {
            painted: function(cmp) {
                let me = this;
                $("#createNew").click(function (e) {
                    e.preventDefault();
                    me.addButtonClick();
                    return false;
                });  
            }
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
            default:
                assert(false);
        }
    },

    initList() {
        let me = this;
        let crud = this.getView().down('crudview');
        crud.showItemView();

        let url = 'api/workspace/' + App.getToken();
        let store = Ext.create('Ext.data.Store', {
            model: 'Ted.model.Workspace',
            autoLoad: true,
            proxy: {
                type: 'tedproxy',
                url: url
            }
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
    

});