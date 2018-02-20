﻿Ext.define('Aux.ComponentExtensions', {}, () => {

    ///////////////////////////////////////////////////////////////////////////////////////
    // Component
    ///////////////////////////////////////////////////////////////////////////////////////
    Ext.override(Ext.Component, {

        upsafe(selector) {
            let cmp = this.up(selector);
            assert(cmp, 'Up(selector) "' + selector + '" did not yield a valid component');
            return cmp;
        },

        downsafe(selector) {
            let cmp = this.down(selector);
            assert(cmp, 'Down(selector) "' + selector + '" did not yield a valid component');
            return cmp;
        },

        getRightPosition() {
            return this.el.getX() + this.el.getWidth();
        },

        getBottomPosition() {
            return this.el.getY() + this.el.getHeight();
        }

    });

    ///////////////////////////////////////////////////////////////////////////////////////
    // Button
    ///////////////////////////////////////////////////////////////////////////////////////

    Ext.override(Ext.Button, {
        
        hideText: function(hide) {
            if (hide) {
                this.originalText = this.getText();
                this.setText('');
            }
            else if (this.originalText) {
                this.setText(this.originalText);
            }
        }

    });


});