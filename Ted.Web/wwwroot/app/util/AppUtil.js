﻿Ext.define('Ted.Util.AppUtil', {
    singleton: true,

    alternateClassName: ['App'],

    getUser() {
        return this.getMainView().getViewModel().get('user');
    },

    getMainView() {
        return Ted.getApplication().getMainView();
    },

    getWorkspace() {
        return this.getMainView().getViewModel().get('workspace');
    }
});