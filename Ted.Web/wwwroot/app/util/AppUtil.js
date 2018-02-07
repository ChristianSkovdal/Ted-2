Ext.define('Ted.Util.AppUtil', {
    singleton: true,

    alternateClassName: ['App'],

    getUser() {
        return this.getMainView().getViewModel().get('user');
    },

    getToken() {
        return this.getUser() ? this.getUser().token : null;
    },

    getMainView() {
        return Ted.getApplication().getMainView();
    },

    getWorkspace() {
        return this.getMainView().getViewModel().get('workspace');
    }
});