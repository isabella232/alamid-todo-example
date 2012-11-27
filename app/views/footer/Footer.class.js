"use strict";

var alamid = require("alamid"),
    View = alamid.View,
    _ = alamid.util.underscore;

var Footer = View.define("Footer", {

    todoModels: null,

    $template: require("./Footer.html"),

    init: function () {
        this.Super();
        this.__initNodeEvents();
    },

    setTodoModels: function (newTodoModels) {

        var oldTodoModels = this.todoModels;

        if (oldTodoModels) {
            oldTodoModels.removeListener("change", this.__updateStats);
            oldTodoModels.removeListener("add", this.__updateStats);
            oldTodoModels.removeListener("remove", this.__updateStats);
        }

        newTodoModels.on("change", this.__updateStats);
        newTodoModels.on("add", this.__updateStats);
        newTodoModels.on("remove", this.__updateStats);

        this.todoModels = newTodoModels;
        this.__updateStats();

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

    __updateStats: function () {
        var numberOfCompletedTasks = 0,
            numberOfUncompletedTasks = 0,
            nodeMap = this.Super._getNodeMap();

        this.todoModels.each(function (todoModel) {
            if (todoModel.get("completed")) {
                numberOfCompletedTasks++;
            } else {
                numberOfUncompletedTasks++;
            }
        });

        nodeMap["todo-count"].innerText = numberOfUncompletedTasks;
        nodeMap["completed-count"].innerText = numberOfCompletedTasks;
    }

});

module.exports = Footer;