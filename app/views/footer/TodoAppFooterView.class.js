"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoAppFooterView = View.define("TodoAppFooterView", {

    $template: require("./TodoAppFooterView.html"),

    init: function () {

        this.Super();

        this._initNodeEvents();
    },

    /**
     * @param {Number} count
     */
    setTodoCount: function (count) {
        var nodeMap = this.Super._getNodeMap();
        nodeMap["todo-count"].innerText = count;
    },

    _initNodeEvents: function () {

        var self = this;

        this.Super._addNodeEvents({
            "all": {
                "click": function () {
                    self.Super.emit("showAll");
                }
            },
            "active": {
                "click": function () {
                    self.Super.emit("showActive");
                }
            },
            "completed": {
                "click": function () {
                    self.Super.emit("showCompleted");
                }
            },
            "clear-completed": {
                "click": function () {
                    self.Super.emit("clearCompleted");
                }
            }
        });

    }

});

module.exports = TodoAppFooterView;