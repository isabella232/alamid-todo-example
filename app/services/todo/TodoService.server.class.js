"use strict";

var alamid = require("alamid"),
    Service = alamid.Service,
    _ = alamid.util.underscore,
    Todo = require("../../models/todo/TodoModel.class.js");

var TodoService = Service.define("TodoService", {


    init: function () {

    },
    __todoId : 0,

    /**
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onCreated
     */
    create: function (ids, model, onCreated) {

        var obj = model.toObject();

        obj.id = this.__todoId++;

        console.log("Obj", obj);

        obj.ids.todo = this.__todoId;

        onCreated({
            status : "success",
            data : obj
        });
    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onRead
     */
    read: function (remote, ids, onRead) {

    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Object} params
     * @param {Function} onReadCollection
     */

    readCollection: function (remote, ids, params, onReadCollection) {

    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onUpdated
     */
    update: function (ids, model, onUpdated) {

        var obj = model.toObject();


        onUpdated({
            status : "success",
            data : obj
        });


    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onDestroyed
     */
    destroy: function (ids, onDestroyed) {

        onDestroyed({
            status : "success"
        });


    }
});

module.exports = TodoService;