"use strict";

var alamid = require("alamid"),
    constants = require("../../constants.js"),
    $ = alamid.util.jQuery,
    View = alamid.View;

var TodoView = View.define("TodoView", {

    $template: require("./TodoView.html"),

    __nodeMap: null,

    init: function () {
        this.Super();
        this.__nodeMap = this.Super._getNodeMap();
        this.__initNodeEvents();
        this.Super.on("beforeRender", this.__onBeforeRender);
    },

    __onBeforeRender: function () {
        var completed = this.Super.getModel().get("completed");

        $(this.__nodeMap.todoListItem).toggleClass("completed", completed);
    },

    __initNodeEvents: function () {
        var self = this;

        this.Super._addNodeEvents({
            destroyButton: {
                click: function () {
                    self.Super.getModel().destroy(function onModelDestroy(err) {
                        if (err) throw err;
                    });
                }
            },
            completed: {
                click: function () {
                    self.Super.getModel().toggle();
                }
            },
            title: {
                dblclick: function () {
                    $(self.__nodeMap.todoListItem).addClass("editing");
                    self.__nodeMap.titleEdit.value = self.Super.getModel().get("title");
                    self.__nodeMap.titleEdit.focus();
                }
            },
            titleEdit: {
                blur: function () {
                    var newTitle = this.value.trim(),
                        todoModel = self.Super.getModel();

                    $(self.__nodeMap.todoListItem).removeClass("editing");
                    if (newTitle) {
                        todoModel.set("title", newTitle);
                        todoModel.save(function onModelSave(err) {
                            if (err) throw err;
                        });
                    } else {
                        todoModel.destroy(function onModelDestroy(err) {
                            if (err) throw err;
                        });
                    }

                },
                keypress: function (event) {
                    if (event.which === constants.KEY_ENTER) {
                        this.blur();
                    }
                }
            }
        });

    }

});

module.exports = TodoView;