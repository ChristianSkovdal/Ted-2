Ext.define('Ted.view.pages.PageContentPickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pagecontentpicker',

    control: {
        'crudview': {
            open: function (cmp, item) {
                let vm = this.getViewModel();
                let rec = vm.get('record');
                if (rec.get('configUi')) {
                    this.onConfigure();
                }
                else {
                    this.onAdd();
                }
            }
        }
    },

    init() {
        let vm = this.getViewModel();
        vm.bind('{record}', function (rec) {
            if (rec) {
                vm.set('showAdd', !rec.get('configUi'));
            }
        });
    },

    onCancel(btn) {
        this.getView().destroy();
    },

    onBackClicked() {
        let vm = this.getViewModel();
        vm.set('showBack', false);
        vm.set('showAdd', !vm.get('record.configUi'));
        vm.set('pageTitle', 'Add Page Content');
        this.lookupReference('wrapper').getActiveItem().destroy();
        //this.lookupReference('wrapper').pop();
    },

    onConfigure() {
        let vm = this.getViewModel();
        var rec = vm.get('record');
        vm.set('pageTitle', 'Configure ' + rec.get('name'));
        vm.set('showBack', true);
        vm.set('showAdd', true);

        //this.lookupReference('wrapper').push({
        //    xtype: rec.get('configUi'),
        //    title: 'Configure ' + rec.get('name'),
        //    defaults: {
        //        margin: 10
        //    }
        //});


        this.lookupReference('wrapper').setActiveItem({
            xtype: rec.get('configUi'),
            defaults: {
                margin: 10
            }
        });
    },

    onAdd() {
        let vm = this.getViewModel();
        var rec = vm.get('record');

        let doAdd = (xtype, config) => {            
            let p = this.getView().getParent();
            this.getView().destroy();
            p.fireEvent('insertcontent', xtype, config);            
        };
        
        var configUi = this.lookupReference('wrapper').down(rec.get('configUi'));
        if (configUi) {
            if (configUi.isValid()) {
                doAdd(rec.get('xtype'), configUi.getConfig());
            }
        }
        else {
            doAdd(rec.get('xtype'));
        }
        
    },


});