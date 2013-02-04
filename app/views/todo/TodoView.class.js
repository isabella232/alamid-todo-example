"use strict";

var alamid = require("alamid"),
    constants = require("../../constants.js"),
    $ = alamid.util.jQuery,
    View = alamid.View;

var TodoView = View.extend("TodoView", {

    template: require("./TodoView.html"),

    constructor: function () {
        this._super();
        this._initNodeEvents();

        this.on("beforeRender", this._onBeforeRender, this);
    },

    _onBeforeRender: function () {

        var completed = this._model.get("completed");
        $(this._nodeMap.todoListItem).toggleClass("completed", completed);
    },

    _initNodeEvents: function () {
        var self = this;

        this._addNodeEvents({
            destroyButton: {
                click: function () {
                    self._model.destroy(function onModelDestroy(err) {
                        if (err) throw err;
                    });
                }
            },
            completed: {
                click: function () {
                    self._model.toggle();
                }
            },
            title: {
                dblclick: function () {
                    $(self._nodeMap.todoListItem).addClass("editing");
                    self._nodeMap.titleEdit.value = self._model.get("title");
                    self._nodeMap.titleEdit.focus();
                }
            },
            titleEdit: {
                blur: function () {
                    var newTitle = this.value.trim(),
                        todoModel = self._model;

                    $(self._nodeMap.todoListItem).removeClass("editing");
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