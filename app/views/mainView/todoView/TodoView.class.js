"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoView = View.define("TodoView", {

    $template: require("./TodoView.html"),

    init: function () {

        this.Super();
        this.__initNodeEvents();
        this.Super.on("beforeRender", this.__onBeforeRender);

    },

    __onBeforeRender: function () {

        var nodeMap = this.Super._getNodeMap(),
            completed = this.Super.getModel().get("completed");

        jQuery(nodeMap["todo-list-item"]).toggleClass("completed", completed);

    },

    __initNodeEvents: function () {

        var self = this;

        this.Super._addNodeEvents({
            "destroy-button": {
                "click": function proxyDelete() {
                    self.Super.emit("deleteTodo", self.Instance);
                }
            },
            "toggle-checkbox": {
                "change": function proxyChange() {
                    self.Super.emit("toggleTodoStatus", self.Instance);
                }
            }
        });

    }

});

module.exports = TodoView;