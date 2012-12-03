"use strict";

var alamid = require("alamid"),
    Service = alamid.Service,
    _ = alamid.util.underscore,
    Todo = require("../../models/todo/TodoModel.class.js");

var TodoService = Service.define("TodoService", {

    /**
     * @type {Number}
     */
    __modelId: 0,

    __setObject : function(key, object) {
        return localStorage.setItem(key, JSON.stringify(object));
    },
    __getObject : function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    init: function () {
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

        /*
         this.__modelId++;
         var self = this;

         try {
         this.__setObject(this.__modelId, model.toObject());
         } catch (err) {
         console.log(err);
         status = "error";
         errMsg = err.message;
         }

         remote({ todo : this.__modelId }, model, onRemoteCreated);

         function onRemoteCreated() {

         onCreated({
         status: status,
         message: errMsg,
         data: {
         id: self.__modelId
         }
         });
         }
         */
        remote(ids, model, function(res) {
            onCreated(res);
        });

    },
    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onRead
     */
    read: function (remote, ids, onRead) {
        var todoListItemId = ids.todo,
            status = "success",
            errMsg,
            data;

        try {
            data = this.__getObject(todoListItemId);
        } catch (err) {
            status = "error";
            errMsg = err.message;
        }

        onRead({
            status: status,
            message: errMsg,
            data:  data
        });
    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Object} params
     * @param {Function} onReadCollection
     */
    readCollection: function (remote, ids, params, onReadCollection) {
        var status = "success",
            rawData = _(localStorage).toArray(),
            data = [];

        _(rawData).each(function jsonParse(modelData, modelId) {
            modelData = JSON.parse(modelData);
            if (modelData !== null) {
                modelData.id = modelId;
                data.push(modelData);
            }
        });

        onReadCollection({
            status: status,
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

        /*
         var todoListItemId = ids.todo,
         status = "success",
         errMsg;

         try {
         this.__setObject(todoListItemId, model.toObject());
         } catch (err) {
         status = "error";
         errMsg = err.message;
         }

         onUpdated({
         status: status,
         message: errMsg
         });
         */

        remote(ids, model, function(res) {
            onUpdated(res);
        });
    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onDeleted
     */
    destroy: function (remote, ids, onDeleted) {

        /*
        var todoListItemId = ids.todo,
            status = "success",
            errMsg;

        try {
            localStorage.removeItem(todoListItemId);
        } catch (err) {
            status = "error";
            errMsg = err.message;
        }

        remote(ids, onRemoteCreated);

        function onRemoteCreated() {

            onDeleted({
                status: status,
                message: errMsg
            });
        }
        */

        if(remote === false) {
            onDeleted({ status : "success" });
            return;
        }
        else {
            remote(ids, onDeleted);
        }
    }
});

module.exports = TodoService;