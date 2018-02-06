﻿Ext.define('Ted.view.dialogs.NewWorkspaceDialog', {
    extend: 'Ted.view.dialogs.BaseDlg',
	xtype: 'newworkspacedlg',

	title: 'New Workspace',

	controller: 'newworkspacedlg',
    viewModel: {
        ws: {}
    },

	width: 400,
	closable: true,
	defaultFocus: 'textfield',
	items: [
		{
			xtype: 'textfield',
			label: 'Name',
			margin: 10,
			bind: {
				value: '{ws.name}'
			},
			listeners: {
                focus: 'onTextFieldFocus'
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
			}
		}
	]
});
