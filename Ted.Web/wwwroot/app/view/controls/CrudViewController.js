Ext.define('Ted.view.controls.CrudViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crudview',

    control: {
        '#': {
            painted: function (cmp) {
                this.lookupReference('grid').setStore(cmp.getStore());
                this.lookupReference('item').setStore(cmp.getStore());
            }
        },
        'crudview>container': {
            painted: function (cmp) {
                if (cmp.getStore && !cmp.getStore()) {
                    cmp.setStore(this.getView().getStore());
                }
            }

        }

    },

    addButtonClick() {

        let view = this.getView();

        var dialog = Ext.create({
            xtype: view.getDialogType()
        });

        dialog.show();

        dialog.on('ok', (cmp, data) => {
            
            let store = view.getStore();
            let vm = this.getViewModel();
            let me = this;

            if (store.findCaseInsensitive('name', data[view.getNameProperty()])) {
                Ext.Msg.alert(view.getNameContext(), view.getAlreadyExistErrorMsg(), f => dialog.down('textfield').focus());
            }
            else {
                store.insert(0, data);
                store.sync({
                    callback(batch, opt) {
                        vm.set('selectedItem', store.first());
                        dialog.destroy();
                    }
                });
            }
        });
    },
    
    refreshButtonClick() {
        var view = this.getView();
        var store = view.getStore();
        store.load();
    },

    onItemDblTap(view, location, options) {
        this.openItem(location.record);
    },

    openButtonClick() {
        let vm = this.getViewModel();
        this.openItem(vm.get('selectedItem'));
    },

    openItem(record) {
        let vm = this.getViewModel();
        this.getView().fireEvent('open', this.getView(), record);
    },

    deleteButtonClick() {

        let view = this.getView();

        Ext.Msg.confirm(view.getNameContext(), 'Are you sure?', answer => {

            if (answer === 'yes') {
                var view = this.getView();
                var store = view.getStore();
                let vm = this.getViewModel();
                let record = vm.get('selectedItem');
                store.remove(record);
                store.sync({
                    callback(batch, opt) {
                        if (store.count() > 0) {
                            vm.set('selectedItem', store.first());
                        }
                    }
                });
            }
        });
    },

});
