Ext.define('Ted.view.controls.FlexViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flexview',

    getCrudView() {
        return this.getView().down('crudview');
    },


    addButtonClick() {
        debugger;

        let store = this.getStore();
        store.insert(0, {});
        store.sync({
            callback(batch, opt) {
                this.getCrudView().setSelection(store.first());
            }
        });
    },

    refreshButtonClick() {
        this.getCrudView().getController().refreshButtonClick();
    },

    openButtonClick() {
        //let crud = this.getView().down('crudview');
        //crud.getController().openButtonClick();
    },

    deleteButtonClick() {
        //let crud = this.getView().down('crudview');
        //crud.getController().deleteButtonClick();
    },

    onSwitchToView(btn) {
        let crud = this.getView().down('crudview');
        crud[btn.getValue()]();
    },

    duplicateRowButtonClick() {

    },

    importButtonClick() {

    },


    getModelName() {

        if (!this.modelName) {

            this.modelName = `Ted.model.${this.getView().dataSourceName}`;

            Ext.define(this.modelName, {
                // TODO:
            });

        }

        return this.modelName;
    },

    getStore() {
        debugger;
        if (!this.store) {

            this.store = Ext.create('Ext.data:Store', {

                model: this.getModelName(),

                autoLoad: false,
                autoSync: false,

                proxy: {
                    type: 'tedproxy',
                }
            });

            this.store.getProxy().setUrl(`api/data/${App.getToken()}/${this.getView().dataSourceName}`);

        }
        return this.store;
    },

    addColumn() {

        var dialog = Ext.create({
            xtype: 'columndlg',
            viewModel: {
                column: {
                    name: 'New Column'
                }
            },

        });
        dialog.show();
        dialog.on('ok', (cmp, data) => {



        });        

    }
});
