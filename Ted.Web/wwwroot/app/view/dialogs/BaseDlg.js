Ext.define('Ted.view.dialogs.BaseDlg', {
	extend: 'Ext.Dialog',
    xtype: 'basedlg',

    controller: 'basedlg',

    width: 400,
    //center:true,
	closable: true,
	defaultFocus: 'textfield',

	buttons: {
		ok: 'onOK',
		cancel: 'onCancel'
	}
});
