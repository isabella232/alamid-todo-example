"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemView = View.define("TodoListItemView", {

    $template: require("./TodoListItemView.html"),

    init: function () {

        this.Super();

        this._initNodeEvents();

    },

    _initNodeEvents: function () {

        var self = this,
            nodeMap = this.Super._getNodeMap();

        this.Super._addNodeEvents({
            "destroy_button": {
                "click": function proxyDelete() {
                    self.Super.emit("deleteTodo", self.Instance);
                }
            },
            "toggle_checkbox": {
                "change": function proxyChange() {

                    jQuery(nodeMap["todo_list_item"]).toggleClass("completed");

                    self.Super.emit("toggleTodoStatus", self.Instance);
                }
            }
        });

    }

});

module.exports = TodoListItemView;