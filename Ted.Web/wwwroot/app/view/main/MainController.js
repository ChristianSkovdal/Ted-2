
Ext.define('Ted.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    collapsedCls: 'main-nav-collapsed',

    control: {
        'main': {
            insertcontent: 'insertContent'
        }
    },

    config: {
        showNavigation: true
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

                this.loadPage(pageHash,
                    page => {

                        var ws = vm.get('workspace');
                        if (!ws) {
                            this.loadWorkspace(page.get('workspaceId'), page, this.openWorkspace)
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
                            case ExceptionCodes.Reauthenticate:
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

    loadPage(id, callback, errorFn) {

        //AjaxUtil.get('api/page/' + App.getToken() + '/' + id,
        //    (result) => callback(result.data),
        //    (result) => errorFn(result),
        //);

        let vm = this.getViewModel();
        let store = vm.getStore('pageStore');
        let url = `/api/page/${App.getToken()}/${id}`;

        let proxy = store.getProxy();
        proxy.setUrl(url);
        proxy.errorHandler = errObj => {
            if (errObj.error != ExceptionCodes.Reauthenticate) {
                return Ted.proxy.TedRestProxy.prototype.errorHandler.call(this, errObj);
            }
        };

        store.load({
            scope: this,
            callback: function (records, op, success) {

                if (success) {
                    callback(records[0])
                }
                else {
                    let result = JSON.parse(op.getResponse().responseText);
                    errorFn(result)
                }
            }
        });
    },

    addPageContents(page, reset) {

        try {

            let view = this.getView();
            let item = view.child('component[pageHash=' + page.getId() + ']');

            if (!item || reset) {
                item = {};

                if (page.get('json')) {


                    Ext.apply(item, JSON.parse(page.get('json')));

                    if (item.hosted) {
                        item = {
                            xtype: 'container',
                            layout: 'fit',
                            items: [item]
                        }
                    }
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
                            html: ` <div class=\'fa-outer-class\'>
                                        <!--<span class=\'x-fa fa-calendar\'></span>-->
                                    </div>
                                    <h1>Lets Get Started!</h1>
                                    <span class=\'blank-page-text\'>
                                        <a href="javascript:Util.invokeControllerMethod(\'main\', \'addPageContentClicked\');">
                                            Click here to add some content to this page
                                        </a><p>
                                        - or -</p>
                                        <a href="javascript:Util.invokeControllerMethod(\'main\', \'addNewPageClicked\');">
                                            Click here to add another page
                                        </a><
                                    </span>`
                        }
                    ];
                }

                //item.xtype = item.xtype || 'container';
                //item.requires = ['Ext.layout.VBox', 'Ext.layout.HBox'];
                item.pageHash = page.getId();
                item.pageRecord = page;

                for (let script in page.get('scripts')) {
                    item[script.name] = new Function('cmp', script.code);
                }
            }

            view.setActiveItem(item);

            this.getViewModel().set('showAuthoringTools', App.getUser());

        } catch (e) {
            Ext.Msg.alert('Error Loading Page with id ' + page.getId(), e.message);
            this.redirectTo('login', true);
            return;
        }

        let navigationTree = this.lookup('navigationTree');
        let store = navigationTree.getStore();
        let node = store.findNode('id', page.getId());
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
                else {
                    this.redirectTo('login');
                }
            }
        });
    },

    openWorkspace(workspace, page, context) {

        let me = context || this;
        let vm = me.getViewModel();
        //vm.set('logoText', 'Ted - ' + workspace.get('name'));

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

        me.addPageContents(page);
    },

    addPageContentClicked() {
        this.showSystemPage('pagecontentpicker');
    },

    addNewPageClicked() {
    },

    insertContent(xtype, cfg) {

        let page = this.getView().getActiveItem().pageRecord;
        assert(page);

        cfg = cfg || {};
        cfg.xtype = xtype;

        debugger;
        page.set('json', JSON.stringify(cfg));

        this.addPageContents(page, true);

    },

    onToggleNavigationSize() {
        this.setShowNavigation(!this.getShowNavigation());
    },

    updateShowNavigation: function (showNavigation, oldValue) {

        if (oldValue !== undefined) {
            var me = this,
                cls = me.collapsedCls,
                logo = me.lookup('logo'),
                navigation = me.lookup('navigation'),
                navigationTree = me.lookup('navigationTree'),
                rootEl = navigationTree.rootItem.el;

            navigation.toggleCls(cls);
            logo.toggleCls(cls);

            if (showNavigation) {
                // Restore the text and other decorations before we expand so that they
                // will be revealed properly. The forced width is still in force from
                // the collapse so the items won't wrap.
                navigationTree.setMicro(false);
            } else {
                // Ensure the right-side decorations (they get munged by the animation)
                // get clipped by propping up the width of the tree's root item while we
                // are collapsed.
                rootEl.setWidth(rootEl.getWidth());
            }

            logo.element.on({
                single: true,
                transitionend: function () {
                    if (showNavigation) {
                        // after expanding, we should remove the forced width
                        rootEl.setWidth('');
                    } else {
                        navigationTree.setMicro(true);
                    }
                }
            });
        }
    },
});