Ext.define('Ted.view.controls.ComponentNameField', {
    extend: 'Ext.field.Text',
    xtype: 'componentnamefield',

    masterField: null,

    listeners: {

        painted: function (cmp) {
            assert(this.masterField);
            let master = this.up('container').down(this.masterField);

            updateValue = () => {
                let v = master.getValue() || '';
                var cleaned = v.replace(/[^\w\s]/gi, '');
                cleaned = cleaned.replace(/ /g, "_");
                cleaned = cleaned.toLowerCase();
                cmp.setValue(cleaned);
            };

            updateValue();

            master.on('keyup', (e, opts) => {
                updateValue();
            });
        },

        //keypress: function (cmp, e, opts) {         
        //}

    }

});