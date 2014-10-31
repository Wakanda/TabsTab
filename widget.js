WAF.define('TabsTab', ['waf-core/widget', 'Button'], function(widget, Button) {
    "use strict";

    var TabsTab = widget.createSubWidget('TabsTab', {
        tagName: 'li',
        init: function() {
            var changeCloseButton = function() {
                if(this.closeButton()) {
                    var button = this.getPart('closeButton');
                    if(!button) {
                        button = new Button({ value: 'X' });
                        this.setPart('closeButton', button);
                    }
                    //this.addClass('waf-' + this.kind.toLowerCase() + '-closable');
                    button.addClass('waf-tabs-closeTab');
                    button.removeClass('waf-button');
                } else {
                    this.setPart('closeButton', undefined);
                    //this.removeClass('waf-' + this.kind.toLowerCase() + '-closable');
                }
            };
            this.closeButton.onChange(changeCloseButton);

            this.node.innerHTML = this.value();
            changeCloseButton.call(this);
        },
        value: widget.property({
            onChange: function() {
                var button = this.getPart('closeButton');
                this.node.innerHTML = this.value();
                this.setPart('closeButton', button);
            },
            defaultValueCallback: function() {
                return this.node.innerHTML;
            }
        }),
        closeButton: widget.property({
            type: 'boolean'
        })
    });
    TabsTab.inherit('waf-behavior/layout/composed');
    TabsTab.removeClass('waf-tabview2tab');

    TabsTab.mapDomEvents({ 'mousedown': 'action' });

    TabsTab.setPart('closeButton');
    TabsTab.addProxiedEvent('action', 'closeButton', 'close');

    return TabsTab;
});
