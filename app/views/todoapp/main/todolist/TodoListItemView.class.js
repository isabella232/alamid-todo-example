"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoListItemView = View.define("TodoListItemView", {

    /**
     * @type {jQuery}
     */
    __$toggleCheckBox: null,

    /**
     * @type {jQuery}
     */
    __$todoListItem: null,

    $template: require("./TodoListItemView.html"),

    init: function () {

        this.Super();

        this._initNodes();
        this._initNodeEvents();

    },

    /**
     * @param {boolean} checked
     */
    setChecked: function (checked) {

        this.__$toggleCheckBox.attr("checked", checked);
        checked ? this.__$todoListItem.addClass("completed") : this.__$todoListItem.removeClass("completed");

    },

    _initNodes: function () {
        var nodeMap = this.Super._getNodeMap();

        this.__$todoListItem = jQuery(nodeMap["todo_list_item"]);
        this.__$toggleCheckBox = jQuery(nodeMap["toggle_checkbox"]);
    },

    _initNodeEvents: function () {

        var self = this;

        this.Super._addNodeEvents({
            "destroy_button": {
                "click": function proxyDelete() {
                    self.Super.emit("deleteTodo", self.Instance);
                }
            },
            "toggle_checkbox": {
                "change": function proxyChange() {

                    self.__$todoListItem.toggleClass("completed");
                    self.__$toggleCheckBox.attr("checked", self.__$todoListItem.hasClass("completed"));

                    self.Super.emit("toggleTodoStatus", self.Instance);
                }
            }
        });

    }

});

module.exports = TodoListItemView;