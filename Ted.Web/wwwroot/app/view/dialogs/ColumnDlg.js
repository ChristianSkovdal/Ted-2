Ext.define('Ted.view.dialogs.ColumnDlg', {
    extend: 'Ted.view.dialogs.BaseDlg',
    xtype: 'columndlg',

    title: 'New Column',
    width: 400,
    closable: true,
    defaultFocus: 'textfield',

    getData() {
        return this.getViewModel().get('column');
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

            xtype: 'selectfield',

            label: 'Data Type',
            options: [
                {
                    text: 'Text',
                    value: 'string'
                },
                {
                    text: 'Email Address',
                    value: 'string'
                }, 
                {
                    text: 'Picture',
                    value: 'string'
                },
                {
                    text: 'Number',
                    value: 'int'
                },
                {
                    text: 'Date',
                    value: 'date'
                }
            ]

        }
    ],


});
