Ext.define('Ted.view.authentication.AuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth',

    tryLogin() {

        let vm = this.getViewModel();

        let login = {
            email: vm.get('email'),
            password: vm.get('password'),
        };

        AjaxUtil.post('api/user/login',
            login,
            (result) => {

                let vm = this.getViewModel();
				vm.set('user', result.data);

                let redir = vm.get('redirectTo', true);
                if (redir) {
                    this.redirectTo(redir, true);
                }
                else {
                    this.redirectTo('workspacelist', true);
                }
                    

                if (vm.get('rememberMe')) {
                    // Persist passwords
                    localStorage.setItem('login_data', JSON.stringify(login));
                }
            },
            () => Ext.Msg.alert('Login Error', 'Wrong email or password')
        );
    },

    registerUser() {

        let vm = this.getViewModel();
		let me = this;
        AjaxUtil.post('api/user',
            {
                email: vm.get('email'),
                password: vm.get('password'),
                fullName: vm.get('fullname')
            },
            (result) => {
                Ext.Msg.alert('Registration', 'User successfully created', () => me.redirectTo('login', true));
            }
        );

    },

    goToRegister() {
        this.redirectTo('register', true);
    },

    
});
