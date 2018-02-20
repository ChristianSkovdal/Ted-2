Ext.define('Aux.ComponentExtensions', {}, () => {

    ///////////////////////////////////////////////////////////////////////////////////////
    // Component
    ///////////////////////////////////////////////////////////////////////////////////////

    if (!Ext.Component.prototype.upsafe) {

        Ext.Component.prototype.upsafe = function (selector) {
            let cmp = this.up(selector);
            assert(cmp, 'Up(selector) "' + selector + '" did not yield a valid component');
            return cmp;
        }
    };

    if (!Ext.Component.prototype.downsafe) {

        Ext.Component.prototype.downsafe = function (selector) {
            let cmp = this.down(selector);
            assert(cmp, 'Down(selector) "' + selector + '" did not yield a valid component');
            return cmp;
        }
    };

    if (!Ext.Component.prototype.getRightPosition) {
        Ext.Component.prototype.getRightPosition = function (selector) {
            return this.el.getX() + this.el.getWidth();

        }
    };

    if (!Ext.Component.prototype.getBottomPosition) {

        Ext.Component.prototype.getBottomPosition = function (selector) {
            return this.el.getY() + this.el.getHeight();

        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////
    // Button
    ///////////////////////////////////////////////////////////////////////////////////////
    if (!Ext.Button.prototype.hideText) {
        Ext.Button.prototype.hideText = function (hide) {

            if (hide) {
                this.originalText = this.getText();
                this.setText('');
            }
            else if (this.originalText) {
                this.setText(this.originalText);
            }
        };
    };

});