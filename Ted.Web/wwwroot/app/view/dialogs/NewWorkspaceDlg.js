﻿Ext.define('Ted.view.dialogs.NewWorkspaceDialog', {
    extend: 'Ted.view.dialogs.BaseDlg',
    xtype: 'newworkspacedlg',

    title: 'New Workspace',
    width: 400,
    closable: true,
    defaultFocus: 'textfield',

    viewModel: {
        ws: {}
    },

    initialize() {
        let vm = this.getViewModel();
        vm.set('ws', {
            name: 'My new workspace',
            description: 'New workspace created by ' + App.getUser().fullName
        });
    },

    getData() {
        return this.getViewModel().get('ws');
    },

    items: [
        {
            xtype: 'textfield',
            label: 'Name',
            margin: 10,
            bind: {
                value: '{ws.name}'
            }
        },
        {
            xtype: 'textareafield',
            label: 'Description',
            margin: 10,
            emptyText: 'Description goes here',
            maxRows: 3,
            bind: {
                value: '{ws.description}'
            },
        }
    ],


});
