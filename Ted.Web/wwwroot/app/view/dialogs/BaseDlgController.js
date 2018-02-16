Ext.define('Ted.view.dialogs.BaseDlgController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.basedlg',


    control: {
        '*': {
            specialkey: 'onSpecialKey'
        }
    },

    onTextFieldFocus(cmp) {
		Ext.defer(f => cmp.select(), 100);
	},

    onOK() {
		let vm = this.getViewModel();
        this.getView().fireEvent('ok', this.getView(), this.getView().getData ? this.getView().getData() : vm.data);
	},

	onCancel() {
		this.getView().destroy();
    },


    onSpecialKey: function (field, event, options) {
        if (field.xtype != 'textareafield') {
            if (event.getKey() === event.ENTER) {
                event.stopEvent();
                this.onOK();
            }
        }
    }
});
