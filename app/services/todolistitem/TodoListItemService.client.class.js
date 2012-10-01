"use strict";

var alamid = require("alamid"),
    Service = alamid.Service,
    _ = alamid.util.underscore;

var TodoListItemService = Service.define("TodoListItemService", {


    /**
     * @type {Number}
     */
    __modelId: 0,

    init: function () {

        this.Super();

        try {
            this.__modelId = localStorage.length - 1;
        } catch(err) {
            console.log("(todo-list-app) Browser does not support localStorage.");
        }

    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onCreated
     */
    create: function (remote, ids, model, onCreated) {

        var status = "success",
            errMsg;

        this.__modelId++;

        try {
            localStorage.setItem(this.__modelId, JSON.stringify(model.toObject()));
        } catch (err) {
            status = "error";
            errMsg = err.message;
        }

        onCreated({
            status: status,
            message: errMsg,
            data: { "id": this.__modelId }
        });

    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onRead
     */
    read: function (remote, ids, onRead) {

        var todoListItemId = ids.todoListItem,
            status = "success",
            errMsg;
            data;

        try {
            data = JSON.parse(localStorage.getItem(todoListItemId));
        } catch (err) {
            status = "error";
            errMsg = err.message;
        }

        onRead({
            status: status,
            message: errMsg,
            data:  data
        })

    },


    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Object} params
     * @param {Function} onReadCollection
     */
    readCollection: function (remote, ids, params, onReadCollection) {

        var status = "success",
            errMsg,
            data = _(localStorage).toArray();

        _(data).each(function jsonParse(modelData, modelId) {
            data[modelId] = JSON.parse(modelData);
        });

        onReadCollection({
            status: "success",
            data: data
        });

    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onUpdated
     */
    update: function (remote, ids, model, onUpdated) {

        var todoListItemId = ids.todoListItem,
            status = "success",
            errMsg;

        try {
            localStorage.setItem(todoListItemId, JSON.stringify(model.toObject()));
        } catch (err) {
            status = "error";
            errMsg = err.message;
        }

        onUpdated({
            status: status,
            message: errMsg
        });
    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onDeleted
     */
    delete: function (remote, ids, onDeleted) {

        var todoListItemId = ids.todoListItem,
            status = "success",
            errMsg;

        try {
            localStorage.removeItem(todoListItemId);
        } catch (err) {
            status = "error";
            errMsg = err.message;
        }

        onDeleted({
            status: status,
            message: errMsg
        });
    }

});

module.exports = TodoListItemService;