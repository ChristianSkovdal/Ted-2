Ext.define('Ted.view.controls.EmptyPage', {
    extend: 'Ext.Container',
    xtype: 'emptypage',

    config: {
        html: '',
        //tpl: '',
    },

    applyHtml(html) {
        this.down('container').setHtml(html);
    },

    // applyTpl(tpl) {
    //     debugger;
    //     this.down('container').setTpl(tpl);
    // },

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    items: [
        {
            //data: {},
            xtype: 'container',
            cls: 'blank-page-container',

            listeners: {

                click: {
                    element  : 'element',
                    fn: function (evt, element) {
                        if (element.id=='clickLink') {
                            let owner = this.component.upsafe('emptypage');
                            owner.fireEvent('emptyLinkClicked', owner);
                        }
                       
                    }
                }
            }
        }
    ]


    
});