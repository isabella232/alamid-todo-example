"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemView = View.define("TodoListItemView", {

    $template: require("./TodoListItemView.html"),

    init: function () {

        var self = this;

        this.Super();

        this.Super._addNodeEvents({
            "destroy_button": {
                "click": function proxyDelete() {
                    self.Super.emit("deleteTodo");
                }
            }
        });
    }



});

module.exports = TodoListItemView;