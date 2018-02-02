Ext.define('Ted.view.dialogs.NewPageDlgController', {
    extend: 'Ted.view.dialogs.BaseDlgController',
    alias: 'controller.newpagedlg',

    onTextFieldFocus(cmp) {
        let vm = this.getViewModel();
        vm.set('page', {
            name: 'New Page',
        });
        this.callParent(arguments);
	}
});
