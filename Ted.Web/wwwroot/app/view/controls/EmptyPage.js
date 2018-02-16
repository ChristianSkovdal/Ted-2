Ext.define('Ted.view.controls.EmptyPage', {
    extend: 'Ext.Container',
    xtype: 'emptypage',

    config: {
        html: ''
    },

    applyHtml(html) {
        this.down('container').setHtml(html);
    },

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    items: [
        {
            xtype: 'container',
            cls: 'blank-page-container',
        }
    ]
    
});