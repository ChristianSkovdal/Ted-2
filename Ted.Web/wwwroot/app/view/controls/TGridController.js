Ext.define('Ted.view.controls.TGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tgrid',

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

    onSwitchToView(btn) {
        let crud = this.getView().down('crudview');
        crud[btn.getValue()]();
    },

    duplicateRowButtonClick() {

    },

    importButtonClick() {

    },
});
