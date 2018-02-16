Ext.define('Ted.view.controls.CommandBar', {
    extend: 'Ext.Toolbar',
    xtype: 'cmdbar',

    requires: [
        'Ext.Button',
        'Ext.Img',
        'Ext.SegmentedButton'
    ],

    docked: 'top',
    userCls: 'main-toolbar',
    shadow: true,

    onResize(width, height, oldWidth, oldHeight) {
        let items = this.getItems().items;
        for (let btn of items) {
            if (btn instanceof (Ext.Button)) {
                btn.hideText(false);
            }
        }

        let last = items.last();
        let firstPosX = items.first().el.getX();
        let idx=0;
        let current = last;

        while (last.getRight() - firstPosX > width && idx >= 0) {
            if (current instanceof (Ext.Button)) {
                current.hideText(true);
            }
            idx=items.indexOf(current) - 1;
            current = items[idx];
        }
    }

});