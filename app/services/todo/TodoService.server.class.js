"use strict";

var alamid = require("alamid"),
    Service = alamid.Service,
    _ = alamid.util.underscore;

var TodoService = Service.define("TodoService", {

    __todoId : 0,
    __todos : null,

    init: function () {
        //init todos collection
        this.__todos = {};
    },
    /**
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onCreated
     */
    create: function (ids, model, onCreated) {

        var obj = model.toObject();

        //get an id
        obj.id = this.__todoId++;

        //add to "DB"
        obj.ids.todo = this.__todoId;

        this.__todos[obj.id] = obj;

        //response
        onCreated({
            status : "success",
            data : obj
        });
    },
    /**
     * @param {Object} ids
     * @param {Function} onRead
     */
    read: function (ids, onRead) {

        var id = ids.todo,
            model = this.__todos[id];

        if(model !== undefined) {

            onRead({
                status : "success",
                data : model
            });

            return;
        }

        onRead({
            status : "fail",
            message : "No todo found for id '" + id + "'"
        });
    },
    /**
     * @param {Object} ids
     * @param {Object} params
     * @param {Function} onReadCollection
     */
    readCollection: function (ids, params, onReadCollection) {

        onReadCollection({
            status : "success",
            data : _(this.__todos).toArray()
        });
    },

    /**
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onUpdated
     */
    update: function (ids, model, onUpdated) {

        var obj = model.toObject();

        var id = ids.todo;

        this.__todos[id] = obj;

        onUpdated({
            status : "success",
            data : obj
        });
    },

    /**
     * @param {Object} ids
     * @param {Function} onDestroyed
     */
    destroy: function (ids, onDestroyed) {

        var id = ids.todo;

        delete this.__todos[id];

        onDestroyed({
            status : "success"
        });
    }
});

module.exports = TodoService;