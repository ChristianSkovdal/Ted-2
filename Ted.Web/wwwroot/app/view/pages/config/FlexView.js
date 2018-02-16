Ext.define('Ted.view.pages.config.FlexView', {
    extend: 'Ext.Container',
    xtype: 'flexview-config',

    layout: 'form',

    viewModel: {
        data: {
            title: 'New Grid',
            createNewDataSource: true,
            isPublic: false,
            dataSourceName: null
        }
    },

    getConfig() {
        let r = this.getViewModel().getData();
        return {
            title: r.title,
            createNewDataSource: r.createNewDataSource,
            isPublic: r.isPublic,
            dataSourceName: r.dataSourceName,
            hosted: true
        };
    },

    isValid() {

        let vm = this.getViewModel();
        // Is there a title (it does not matter if it already exist)
        if (vm.get('title') === '') {
            Ext.Msg.alert('Invalid Content', 'No tile has been specified', () => this.down('#title').focus());
            return false;
        }

        // Does the data source name exist. If yes ask if the user wants to change the name
        // or use the existing one
        if (!vm.get('dataSourceName')) {
            //Ext.Msg.alert('Invalid Content', 'No tile has been specified');
            return false;
        }

        return true;
    },

    items: [
        {
            xtype: 'textfield',
            label: 'Title',
            itemId: 'title',
            required: true,
            bind: {
                value: '{title}'
            }

        },
        {
            xtype: 'checkboxfield',
            label: 'Public Grid',
            bind: {
                checked: '{isPublic}'
            }
        },
        {
            xtype: 'checkboxfield',
            label: 'New Data Source',
            bind: {
                checked: '{createNewDataSource}'
            }
        },
        {
            xtype: 'componentnamefield',
            masterField: '#title',
            readOnly: true,
            label: 'Datasource Name',
            allowWhiteSpace: false,
            bind: {
                value: '{dataSourceName}',
                hidden: '{!createNewDataSource}'
            }
        },
        {
            xtype: 'comboboxfield',
            label: 'Data sources:',
            bind: {
                value: '{dataSourceName}',
                hidden: '{createNewDataSource}'
            }
        }

    ]

});
