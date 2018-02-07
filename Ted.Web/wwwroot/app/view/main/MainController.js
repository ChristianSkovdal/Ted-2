
Ext.define('Ted.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',


    control: {
        'main': {
            addPageContentClick: 'onAddPageContent'

        }
    },

    routes: {
        ':node': 'setCurrentView'
    },

    setCurrentView: function (pageHash) {
        let vm = this.getViewModel();
        let me = this;

        let isValidId = n => {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        let doLogin = (rsp) => {

            let loginStr = localStorage.getItem('login_data');
            if (loginStr) {
                var login = JSON.parse(loginStr);
                AjaxUtil.post('api/user/login',
                    login,
                    (result) => {

                        vm.set('user', result.data);
                        if (isValidId(pageHash)) {
                            this.setCurrentView(pageHash);
                        }
                        else {
                            this.showWorkspaceList();
                        }
                    },
                    () => {
                        this.showLogin(pageHash);
                    }
                );
            }
            else {
                this.showLogin(pageHash);
            }
        }

        try {
            if (isValidId(pageHash)) {

                this.loadPageMetaData(pageHash,
                    page => {

                        var ws = vm.get('workspace');
                        if (!ws) {
                            this.loadWorkspace(page.workspaceId, page, this.openWorkspace)
                        }
                        else {
                            this.openWorkspace(ws, page);
                        }
                    },
                    err => {
                        switch (err.error) {
                            case ExceptionCodes.PageNotFound:
                                this.showLogin()
                                break;
                            case ExceptionCodes.Authentication:
                                doLogin();
                                break;
                            default:
                                this.showLogin()
                        }
                    });
            }
            else {
                if (['login', 'register'].indexOf(pageHash) < 0 && !App.getUser()) {
                    doLogin();
                }
                else if (pageHash) {
                    this.showSystemPage(pageHash);
                }
                else {
                    Ext.Msg.alert('Error', 'Missing page hash');
                }
            }
        } catch (e) {
            Ext.Msg.alert('Error', 'Fatal error setting the active view');
        }

    },

    showWorkspaceList() {
        this.redirectTo('workspacelist', true);
    },

    showLogin(pageHash) {
        let isValidId = n => {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        if (isValidId(pageHash)) {
            this.redirectTo('login' + '>redirectTo=' + pageHash, true);
        }
        else {
            this.redirectTo('login', true);
        }

    },

    showSystemPage(xtype) {
        let tokens = xtype.split('>');
        xtype = tokens[0];
        try {

            let view = this.getView();
            let item = view.child('component[xtype=' + xtype + ']');

            if (!item) {
                item = {
                    xtype: xtype
                }
            }

            view.setActiveItem(item);
            item = view.down(xtype);

            if (tokens.length > 1) {
                for (var i = 0; i < length; i++) {
                    let propSet = tokens[i + 1].split('=');
                    item.getViewModel().set(propSet[0], propSet.length === 1 ? null : propSet[1]);
                }
            }

            this.getViewModel().set('showAuthoringTools', item.showTools);

        } catch (e) {
            Ext.Msg.alert('Error Loading Page ' + xtype, e.message);
            this.redirectTo('login', true);
            return;
        }

    },

    loadPageMetaData(id, callback, errorFn) {

        AjaxUtil.get('api/page/' + App.getToken() + '/' + id,
            (result) => callback(result.data),
            (result) => errorFn(result),
        );
    },

    loadPageContents(page, reset) {

        try {

            let view = this.getView();
            let item = view.child('component[pageHash=' + page.id + ']');

            if (!item || reset) {
                item = {};

                if (page.json) {

                    Ext.apply(item, JSON.parse(page.json));
                    item.layout = item.layout || 'vbox';
                }
                else {
                    // default contents
                    item.layout = {
                        type: 'vbox',
                        pack: 'center',
                        align: 'center'
                    };
                    item.items = [
                        {
                            cls: 'blank-page-container',
                            html: '<div class=\'fa-outer-class\'><span class=\'x-fa fa-calendar\'></span></div>' +
                            '<h1>Lets Get Started!</h1><span class=\'blank-page-text\'>' +
                            '<a href="javascript:Util.invokeMethod(\'main\', \'addPageContentClick\');">Click here to add some content</a></span>'
                        }
                    ];
                }

                item.xtype = item.xtype || 'container';
                item.requires = ['Ext.layout.VBox', 'Ext.layout.HBox'];
                item.pageHash = page.id;

                for (let script in page.scripts) {
                    item[script.name] = new Function('cmp', script.code);
                }
            }

            view.setActiveItem(item);

            this.getViewModel().set('showAuthoringTools', App.getUser());

        } catch (e) {
            Ext.Msg.alert('Error Loading Page with id ' + page.id, e.message);
            this.redirectTo('login', true);
            return;
        }

        let navigationTree = this.lookup('navigationTree');
        let store = navigationTree.getStore();
        let node = store.findNode('id', page.id);
        navigationTree.setSelection(node);

    },

    loadWorkspace(id, page, callback) {
        let vm = this.getViewModel();
        let store = vm.getStore('workspaceStore');
        store.getProxy().setUrl(`/api/workspace/${App.getToken()}/${id}`);
        store.load({
            scope: this,
            callback: function (records, op, success) {
                if (success) {
                    vm.set('workspace', records[0]);
                    callback(records[0], page, this);
                }
            }
        });
    },

    openWorkspace(workspace, page, context) {

        let me = context || this;
        let vm = me.getViewModel();
        vm.set('logoText', 'Ted - '+workspace.get('name'));

        if (workspace.get('startupCode')) {
            new Function('main', 'workspace', workspace.get('startupCode'))(me.getView(), null);
        }

        let nodes = JSON.parse(workspace.get('navigation'));
        for (let node of nodes) {
            if (node.children && node.children.length > 0) {
                node.expanded = false;
            }
            else {
                node.leaf = true;                
            }
        }

        let navigationTree = me.lookup('navigationTree');
        let store = Ext.create('Ext.data.TreeStore', {
            storeId: 'NavigationTree',

            fields: [{
                name: 'text'
            }],

            root: {
                expanded: true,
                children: nodes
            }
        });
        navigationTree.setStore(store);

        me.loadPageContents(page);
    },

    onAddPageContent() {
        this.redirectTo('pagecontentgallery', true);
    }

});
