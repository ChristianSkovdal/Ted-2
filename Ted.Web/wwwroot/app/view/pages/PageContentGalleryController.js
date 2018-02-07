Ext.define('Ted.view.pages.PageContentGalleryController', {
    extend: 'Ted.view.pages.ContentGalleryController',
    alias: 'controller.pagecontentgallery',


    control: {
        'contentgallery': {
            open: function (cmp, item) {
                let ws = cmp.getViewModel().get('contentType');
                debugger;
            }
        }
    },

          

});