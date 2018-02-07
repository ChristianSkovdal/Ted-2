Ext.define('Ted.view.pages.ContentGalleryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contentgallery',


    //control: {
    //    '#': {
    //        initialize: 'init'
    //    }
    //},

    config: {
        contentData: null

    },

    init(gallery) {

        let crud = gallery.down('crudview');
        crud.showItemView();

        let store = Ext.create('Ext.data.Store', {
            fields: ['name', 'description', 'picture', 'icon'],
            data: gallery.contentData
        });

        crud.setStore(store);
    },

        

});