"use strict";

var alamid = require("alamid"),
    constants = require("../../../constants.js"),
    View = alamid.View;

var TodoView = View.define("TodoView", {

    $template: require("./TodoView.html"),

    __editMode: false,

    __nodeMap: null,

    init: function () {

        this.Super();
        this.__nodeMap = this.Super._getNodeMap();
        this.__initNodeEvents();
        this.Super.on("beforeRender", this.__onBeforeRender);

    },

    __onBeforeRender: function () {
        var completed = this.Super.getModel().get("completed");

        jQuery(this.__nodeMap.todoListItem).toggleClass("completed", completed);
    },

    __initNodeEvents: function () {

        var self = this;

        this.Super._addNodeEvents({
            "destroy-button": {
                "click": function proxyDelete() {
                    self.Super.emit("deleteTodo", self.Instance);
                }
            },
            "completed": {
                "change": function proxyChange() {
                    self.Super.emit("toggleTodoStatus", self.Instance);
                }
            },
            "title": {
                "dblclick": function () {
                    jQuery(self.__nodeMap.todoListItem).addClass("editing");
                    self.__nodeMap.titleEdit.value = self.Super.getModel().get("title");
                    self.__nodeMap.titleEdit.focus();
                }
            },
            "titleEdit": {
                "blur": function () {
                    var newTitle = this.value.trim(),
                        todoModel = self.Super.getModel();

                    jQuery(self.__nodeMap.todoListItem).removeClass("editing");
                    if (newTitle) {
                        todoModel.set("title", newTitle);
                        todoModel.save(function onTodoModelSaved(err) {
                            if (err) throw err;
                        });
                    } else {
                        todoModel.destroy(function onTodoModelDestroyed(err) {
                            if (err) throw err;
                        });
                    }

                },
                "keypress": function (event) {
                    if (event.which === constants.KEY_ENTER) {
                        this.blur();
                    }
                }
            }
        });

    }

});

module.exports = TodoView;