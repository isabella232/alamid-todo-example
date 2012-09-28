"use strict";

var alamid = require("alamid"),
    View = alamid.Page;

var TodoAppMainToggleAllView = View.define("TodoAppMainToggleAllView", {

    $template: require("./TodoAppMainToggleAllView.html"),

    init: function () {

        this.Super();
    },

    _initNodeEvents: function () {
        var self = this;

        this.Super._addNodeEvents({
            "toggle-all": {
                "click": function proxyClick() {
                    self.Super.emit("toggleAll");
                }
            }
        });
    }
});

module.exports = TodoAppMainToggleAllView;