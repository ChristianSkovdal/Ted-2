/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Ted.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
        ':node': 'setCurrentView',
        'foo/about': 'about'
    },

    listeners: {
        unmatchedroute: 'setCurrentView'
    },
    

    onUnmatchedRoute: function (token) {
        debugger;
    },

    setCurrentView: function (hashTag) {
        //debugger;
    }
    
});
