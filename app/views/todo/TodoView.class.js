"use strict";

var alamid = require("alamid"),
    constants = require("../../constants.js"),
    $ = alamid.util.jQuery,
    View = alamid.View;

var TodoView = View.extend("TodoView", {

    template: require("./TodoView.html"),

    domEvents: {
        destroyButton: {
            click: "_onDestroyButtonClick"
        },
        completed: {
            click: "_onCompletedClick"
        },
        title: {
            dblclick: "_onTitleDblclick"
        },
        titleEdit: {
            blur: "_onTitleEditBlur",
            keypress: "_onTitleEditKeyPress"
        }
    },

    constructor: function () {
        this._super();
        this.on("render", this._onRender, this);
    },

    _onRender: function () {
        var completed = this._model.get("completed");

        $(this._nodes.todoListItem).toggleClass("completed", completed);
    },

    _onDestroyButtonClick: function () {
        this._model.destroy(function onModelDestroy(err) {
            if (err) throw err;
        });
    },

    _onCompletedClick: function () {
        this._model.toggle();
    },

    _onTitleDblclick: function () {
        $(this._nodes.todoListItem).addClass("editing");
        this._nodes.titleEdit.value = this._model.get("title");
        this._nodes.titleEdit.focus();
    },

    _onTitleEditBlur: function (event) {
        var newTitle = event.target.value.trim(),
            model = this._model;

        $(this._nodes.todoListItem).removeClass("editing");

        if (newTitle) {
            model.set("title", newTitle);
            model.save(function onModelSave(err) {
                if (err) throw err;
            });
        } else {
            model.destroy(function onModelDestroy(err) {
                if (err) throw err;
            });
        }
    },

    _onTitleEditKeyPress: function (event) {
        if (event.which === constants.KEY_ENTER) {
            event.target.blur();
        }
    }

});

module.exports = TodoView;