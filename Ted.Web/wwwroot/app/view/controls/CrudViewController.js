﻿Ext.define('Ted.view.controls.CrudViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crudview',

    control: {
        '#': {
            painted: function (cmp) {
                //this.lookupReference('grid').setStore(cmp.getStore());
                //this.lookupReference('item').setStore(cmp.getStore());
            }
        },
        'crudview>container': {

            painted: function (cmp) {
                if (this.getView().getStore()) {
                    cmp.setStore(this.getView().getStore());
                    if (!cmp.getSelection() && cmp.getStore().count() > 0) {
                        cmp.setSelection(cmp.getStore().first());
                    }
                }
            },
            childdoubletap: function (view, location, options) {
                this.openItem(location.record);
            },
            select: function (cmp, selected) {
                if (Array.isArray(selected)) {
                    selected = selected[0];
                }
                this.getView().publishState('selection', selected);
            }
        },
        //'crudview>grid': {
        //    painted: function (cmp) {
        //        
        //        cmp.setStore(this.getView().getStore());
        //    }
        //}

    },

    addButtonClick() {

        let view = this.getView();

        let addData = (cmp, data) => {

            let store = view.getStore();
            let name = data[view.getNameProperty()]
            if (store.findCaseInsensitive(view.getNameProperty(), name)) {
                Ext.Msg.alert(view.getNameContext(), Ext.String.format(view.getAlreadyExistErrorMsg(), name), f => dialog.down('textfield').focus());
            }
            else {
                store.insert(0, data);
                store.sync({
                    callback(batch, opt) {
                        view.setSelection(store.first());
                        dialog.destroy();
                    }
                });
            }
        };

        let dlgtype = view.getDialogType();
        if (dlgtype) {
            var dialog = Ext.create({
                xtype: dlgtype
            });
            dialog.show();
            dialog.on('ok', addData);
        }
        else {
            addData(null,null);
        }


       
    },

    refreshButtonClick() {
        var view = this.getView();
        var store = view.getStore();
        store.load();
    },

    openButtonClick() {
        let record = view.getSelection();
        this.openItem(record);
    },

    openItem(record) {
        this.getView().fireEvent('open', this.getView(), record);
    },

    deleteButtonClick() {

        let view = this.getView();
        let record = view.getSelection();

        Ext.Msg.confirm(view.getNameContext(),
            Ext.String.format(view.getDeleteConfirmationMsg(), record.get(view.getNameProperty())), answer => {

                if (answer === 'yes') {
                    let store = view.getStore();
                    store.remove(record);
                    store.sync({
                        callback(batch, opt) {
                            if (store.count() > 0) {
                                view.setSelection(store.first());
                            }
                        }
                    });
                }
            });
    },


});
