"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var Footer = View.define("Footer", {

    todoModels: null,

    $template: require("./Footer.html"),

    init: function () {

        this.Super();
        this.__initNodeEvents();

    },

    /**
     * @param {Number} count
     */
    setTodoModels: function (newTodoModels) {

        var oldTodoModels = this.todoModels;

        if (oldTodoModels) {
            oldTodoModels.removeListener("add", this.__updateTodoCount);
            oldTodoModels.removeListener("remove", this.__updateTodoCount);
        }

        newTodoModels.on("add", this.__updateTodoCount);
        newTodoModels.on("remove", this.__updateTodoCount);

        this.todoModels = newTodoModels;
        this.__updateTodoCount();

    },

    __initNodeEvents: function () {

        var self = this;

        this.Super._addNodeEvents({
            "all": {
                "click": function () {
                    self.Super.emit("showAll");
                    jQuery(self.Super.getNode()).find("a").removeClass("selected");
                    jQuery(this).addClass("selected");
                }
            },
            "active": {
                "click": function () {
                    self.Super.emit("showActive");
                    jQuery(self.Super.getNode()).find("a").removeClass("selected");
                    jQuery(this).addClass("selected");
                }
            },
            "completed": {
                "click": function () {
                    self.Super.emit("showCompleted");
                    jQuery(self.Super.getNode()).find("a").removeClass("selected");
                    jQuery(this).addClass("selected");
                }
            },
            "clear-completed": {
                "click": function () {
                    self.Super.emit("clearCompleted");
                }
            }
        });

    },

    __updateTodoCount: function () {

        var nodeMap = this.Super._getNodeMap();

        nodeMap["todo-count"].innerText = this.todoModels.size();

    }

});

module.exports = Footer;