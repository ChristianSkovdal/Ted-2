Ext.define('Ted.view.dialogs.ColumnDlg', {
    extend: 'Ted.view.dialogs.BaseDlg',
    xtype: 'columndlg',

    title: 'New Field',
    width: 400,
    autoSize: true,
    closable: true,
    defaultFocus: 'textfield',



    getData() {
        return this.getViewModel().getData();
    },

    // listeners: {
    //     painted: function () {
    //         let select = this.downsafe('selectfield');
    //         select.setSelection(select.getStore().getAt(0));
    //     }
    // },

    items: [

        {
            xtype: 'formpanel',

            defaults: {
                labelAlign: 'top',
                errorTarget: 'under'
            },

            items: [
                {
                    xtype: 'textfield',
                    label: 'Title',
                    margin: 10,
                    required: true,
                    bind: {
                        value: '{name}'
                    }
                },
                {

                    xtype: 'selectfield',
                    //forceSelection: true,
                    bind: {
                        value: '{dataType}'
                    },
                    label: 'Data Type',
                    margin: 10,
                    options: [
                        {
                            text: 'Text',
                            value: 'text'
                        },
                        {
                            text: 'Email Address',
                            value: 'email'
                        },
                        {
                            text: 'Picture',
                            value: 'picture'
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
            ]
        }
    ],


});
