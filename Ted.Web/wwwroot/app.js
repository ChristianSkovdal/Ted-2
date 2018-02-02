
Ext.Loader.setPath('Aux', 'auxiliary');

Ext.application({
    extend: 'Ext.app.Application',

    name: 'Ted',

    defaultToken: 'login',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    
    requires: [
        'Ted.*',
        'Aux.*',
        'Ted.Enum.*'
    ],

    // The name of the initial view to create.
    mainView: 'Ted.view.main.Main'
});
