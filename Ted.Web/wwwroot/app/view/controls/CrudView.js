Ext.define('Ted.view.controls.CrudView', {
    extend: 'Ext.Container',
    xtype: 'crudview',

    controller: 'crudview',
    layout: 'card',

    config: {
        nameContext: 'Items',
        alreadyExistErrorMsg: 'An item with the name {0} already exist',
        deleteConfirmationMsg: 'Are you sure you want to delete {0}?',
        nameProperty: 'name',
        store: null,
        dialogType: null,
        selection: null,
        itemTpl: '<div class="dataview-item">' +
        '<img draggable="false" src="{image}" />' +
        '<div class="name">{name}</div>' +
        '</div>'
    },

    updateSelection(record) {
        this.getActiveItem().setSelection(record);
    },

    //getSelection() {
    //    
    //    this.getActiveItem().getSelection();
    //},

    //setStore(store) {
    //    this.getActiveItem().setStore(store);
    //},

     updateItemTpl(tpl) {
        if (this.down('dataview'))
            this.down('dataview').setItemTpl(tpl);
    },

     items: [
         {
             xtype: 'emptypage',
             html: ` <div class=\'fa-outer-class\'>
                         <!--<span class=\'x-fa fa-calendar\'></span>-->
                     </div>
                     <span class=\'blank-page-text\'>
                         <a href="javascript:Util.invokeControllerMethod(\'flexview\', \'addColumn\');">
                             Click here to add a field
                         </a>
                     </span>`
         },                     
         {
             xtype: 'grid',
             //columns: [
             //    {
             //        text: 'Name',
             //        dataIndex: 'name'
             //    }
             //],
         },
        {
            xtype: 'dataview',
            inline: true,
            ui: 'default',
            margin: 10,
            //cls: 'dataview-item',
        }
    ],

    showGridView() {
        this.setActiveItem(this.down('grid'));
    },

    showItemView() {
        this.setActiveItem(this.down('dataview'));
    },

    getFields() {
        //return this.down('grid').getColumns()
        //    .filter(r => r.getDataIndex() !== 'id')
        //    .map(r => {

        //        return {
        //            type: r.dataType || r._dataType,
        //            name: r._dataIndex
        //        };
        //    });

    },

});

