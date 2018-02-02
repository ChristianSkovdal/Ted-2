Ext.define('Ted.view.dialogs.NewPageDialog', {
    extend: 'Ted.view.dialogs.BaseDlg',
	xtype: 'newpagedlg',

	title: 'New Page',

    controller: 'newpagedlg',
    viewModel: 'newpagedlg',

	items: [
		{
			xtype: 'textfield',
			label: 'Name',
			margin: 10,
			bind: {
				value: '{page.name}'
			},
			listeners: {
				focus: 'onTextFieldFocus'
			}
        },
   //     {
   //         xtype: 'fontawesomecombo',
   //         label: 'Icon',
			//margin: 10,
   //     }
	],
});
