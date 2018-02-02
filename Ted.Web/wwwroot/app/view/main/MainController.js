/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Ted.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
        ':node': 'setCurrentView'
    },

    listeners: {
        unmatchedroute: 'setCurrentView'
    },

    onUnmatchedRoute: function (token) {

    },

    setCurrentView: function (pageHash) {
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
                            showWorkspaceList();
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


        if (isValidId(pageHash)) {
            this.loadPageMetaData(pageHash, page => {

                if (page.isPublic) {

                    this.loadWorkspaceFromPage(page.id, true, ws => {
                        this.getViewModel().set('workspace', ws);
                        this.loadPageContents(page, false);

                    }, doLogin);

                }
                else {

                    if (this.getViewModel().get('user')) {

                        if (this.getViewModel().get('workspace', ws)) {
                            this.loadPageContents(page, true);

                        }
                        else {
                            this.loadWorkspaceFromPage(page.id, false, ws => {
                                this.getViewModel().set('workspace', ws);
                                this.loadPageContents(page, true);

                            }, doLogin);
                        }

                    }
                    else {
                        doLogin();
                    }
                }

            }, doLogin);
        }
        else {
            this.showSystemPage(pageHash);
            //if (this.getViewModel().get('user')) {
            //    this.showWorkspaceList();
            //}
            //else {
            //    this.showSystemPage(pageHash);
            //    //doLogin();
            //}
        }

    },

    showWorkspaceList() {
        this.redirectTo('workspacelist');
    },

    showLogin(pageHash) {
        debugger;
        let isValidId = n => {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        if (isValidId(pageHash)) {
            Ted.redirectHash = pageHash;
        }

        this.redirectTo('login');
    },

    showSystemPage(xtype, showTools) {

        // Hide tools
        if (showTools) {

        }

        let view = this.getView();
        let item = view.child('component[xtype=' + xtype + ']');

        if (!item) {
            view.setActiveItem({
                xtype: xtype,
            });
        }

    },

    loadPageMetaData(id, callback, errorFn) {

        let SIMULATED_PAGE_FROM_SERVER = {
            viewType: 'MyPage',
            id: 123,
            isPublic: false
        };

        callback(SIMULATED_PAGE_FROM_SERVER);
    },

    showPage(pageHash, viewType, presentationMode) {

        let view = this.getView();
        let item = view.child('component[pageHash=' + pageHash + ']');

        if (!item) {
            item = {
                xtype: viewType,//node.get('viewType'),
                pageHash: pageHash
            };
        }

        view.setActiveItem(item);

        let navigationTree = this.lookup('navigationTree');
        let store = navigationTree.getStore();
        let node = store.findNode('pageHash', pageHash);

        navigationTree.setSelection(node);
    },

    loadPageContents(page, showTools) {

        let SIMULATED_PAGE_FROM_SERVER = {
            viewType: 'MyPage',
            id: 123,
            isPublic: false,
            code: [
                'alert("I was Hit!");',
                'this.up("panel").setTitle("Me Too!");',
            ],
            json: 'some json here'
        };

        //let json = JSON.parse(SIMULATED_PAGE_FROM_SERVER.json);
        let json = {
            title: 'My Page',
            tbar: [
                {
                    text: 'Hit Me',
                    handler: 'MyPage_fn__0'
                }, {
                    text: 'Me Too',
                    handler: 'MyPage_fn__1'
                },
            ]
        };

        for (var i = 0; i < SIMULATED_PAGE_FROM_SERVER.code.length; i++) {
            let script = SIMULATED_PAGE_FROM_SERVER.code[i];
            this['MyPage_fn__' + i] = new Function(script);
        }

        let stdProps = {
            extend: 'Ext.Panel',
            xtype: SIMULATED_PAGE_FROM_SERVER.viewType
        };

        Ext.apply(json, stdProps);

        Ext.define('MyPage', json);

        // showTools = show toolbar and navigationtree

        page.json = json;

        this.showPage(page.id, page.viewType, false);

    },

    loadWorkspaceFromPage(pageHash, public, callback, errorFn) {

        // public = only load public pages

        let SIMULATED_WORKSPACE_FROM_SERVER = {
            navigationStoreChildren: [],
            startUpCode: 'alert("Loading!!!");',
            shutDownCode: '',
            navigation: ''
        };

        new Function('controller', SIMULATED_WORKSPACE_FROM_SERVER.startUpCode)(this);

        // Populate NavigationStore from workspace
        //let navigation = JSON.parse(SIMULATED_WORKSPACE_FROM_SERVER.navigation);
        let navigation = [
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-desktop',
                //rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'admindashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Health Check Details',
                iconCls: 'x-fa fa-send',
                //rowCls: 'nav-tree-badge nav-tree-badge-hot',
                viewType: 'email',
                leaf: true
            }
        ];
        debugger;
        let navigationTree = this.lookup('navigationTree');
        let store = Ext.create('Ext.data.TreeStore', {
            storeId: 'NavigationTree',

            fields: [{
                name: 'text'
            }],

            root: {
                expanded: true,
                children: navigation
            }
        });
        navigationTree.setStore(store);
        
        callback(SIMULATED_WORKSPACE_FROM_SERVER);
    }


});
