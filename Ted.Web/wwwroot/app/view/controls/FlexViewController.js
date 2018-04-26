Ext.define('Ted.view.controls.FlexViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flexview',


    control: {
        'crudview > emptypage': {
            emptyLinkClicked: function () {
                this.addFieldButtonClick();
            }
        }
    },

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

            Ext.undefine(this.modelName);

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

    addFieldButtonClick() {
        var dialog = Ext.create({
            xtype: 'columndlg',
            viewModel: {
                data: {
                    name: 'New Field',
                    dataType: 'text'
                }
            },

        });
        dialog.show();
        dialog.on('ok', (cmp, data) => {

            if (dialog.down('formpanel').validate()) {
                dialog.destroy();
                this.insertColumn(data);
            }
        });

    },

    insertColumn(colData) {
        let view = this.getView();

        let addColumn = (colData) => {

            
            
        };

        debugger;
        // Should we create the data source?
        if (view.getFields().length == 0) {

            let uniqueTableName = `T${App.getUser().id}_${view.dataSourceName}`
            let dataIndex = colData.name.replace(' ', '_');

            let tableDef = {
                name: uniqueTableName,
                isPublic: view.isPublic,
                column: {
                    name: dataIndex,
                    dataType: colData.type
                }
            };

            let url = `api/table/${App.getToken()}`;
            AjaxUtil.post(url, tableDef, () => {

                // Add the column
                addColumn(colData);

            });

        }
        else {
            addColumn(colData);
        }

    }
});
