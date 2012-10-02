"use strict";

var alamid = require("alamid"),
    View = alamid.View;

var TodoAppHeaderNewTodo = View.define("TodoAppHeaderNewTodo", {

    $template: require("./TodoAppHeaderNewTodoView.html"),

    init: function () {

        var nodeMap,
            self = this;

        this.Super();

        nodeMap = this.Super._getNodeMap();

        this.Super._addNodeEvents({

           "title": {

               "keypress": function onKeypress(event) {
                    if (event.which === 13) {
                        self.Super.emit("newTodo", nodeMap.title.value);
                    }
               }

           }

        });
    }


});

module.exports = TodoAppHeaderNewTodo;