/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Ted.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        workspace: null,
        user: null,

        showAuthoringTools: false,

    }

});
