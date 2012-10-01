"use strict";

var alamid = require("alamid"),
    View = alamid.Page;

var TodoAppMainToggleAllView = View.define("TodoAppMainToggleAllView", {

    /**
     * @type {Boolean}
     */
    _complete: false,

    $template: require("./TodoAppMainToggleAllView.html"),

    init: function () {

        this.Super();
    },

    _initNodeEvents: function () {
        var self = this;

        this.Super._addNodeEvents({
            "toggle-all": {
                "click": function proxyClick() {
                    self._toggleComplete();
                    self.Super.emit("toggleAll", {
                        complete: self._complete
                    });
                }
            }
        });
    },

    _toggleComplete: function () {
        this._complete = !this._complete;
    }

});

module.exports = TodoAppMainToggleAllView;