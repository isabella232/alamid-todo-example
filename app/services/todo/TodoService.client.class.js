"use strict";

var alamid = require("alamid"),
    Service = alamid.Service,
    _ = alamid.util.underscore,
    config = alamid.config;

/**
 * Todo-Client-Service
 *
 * Todo-Service which stores data in LocalStorage
 * added a flag (__useServerService) to show proxy-handling
 * disable to create client-only app
 * @type {*}
 */
var TodoService = Service.define("TodoService", {

    /**
     * @type {Number}
     */
    __modelId: 0,

    /**
     * helper function to store objects in localStorage
     * @param key
     * @param object
     * @private
     */
    __setObject : function(key, object) {
        return localStorage.setItem(key, JSON.stringify(object));
    },
    /**
     * helper function to retrieve objects from localStorage
     * @param key
     * @return {*}
     * @private
     */
    __getObject : function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    /**
     * set this flag to enable the server-service proxy
     * needed for realtime awesomeness
     */
    __useServerService : true,
    /**
     * constructor
     */
    init: function () {
        try {
            this.__modelId = localStorage.length - 1;
        } catch(err) {
            console.log("(todo-list-app) Browser does not support localStorage.");
        }
    },

    /**
     * Called by model.save() if model has no ID yet
     *
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onCreated
     */
    create: function (remote, ids, model, onCreated) {

        if(remote !== false && this.__useServerService) {
            remote(ids, model, onCreated);
            return;
        }

        var status = "success",
            errMsg,
            self = this;

        //increment id
        this.__modelId++;

        try {
            this.__setObject(this.__modelId, model.toObject());
        } catch (err) {
            status = "error";
            errMsg = err.message;
        }

        onCreated({
            status: status,
            message: errMsg,
            data: {
                id: self.__modelId
            }
        });
    },
    /**
     * Called by Model.findById or model.fetch
     *
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onRead
     */
    read: function (remote, ids, onRead) {

        if(remote !== false && this.__useServerService) {
            remote(ids, onRead);
            return;
        }

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
     * Called by Model.find(), returns an array of models
     *
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Object} params
     * @param {Function} onReadCollection
     */
    readCollection: function (remote, ids, params, onReadCollection) {

        if(remote !== false && this.__useServerService) {
            remote(ids, params, onReadCollection);
            return;
        }

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
     * Called by model.save if a model has an ID
     *
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onUpdated
     */
    update: function (remote, ids, model, onUpdated) {

        if(remote !== false && this.__useServerService) {
            remote(ids, model, onUpdated);
            return;
        }

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
    },

    /**
     * Called by Model.destroy()
     *
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onDeleted
     */
    destroy: function (remote, ids, onDeleted) {

        if(remote !== false && this.__useServerService) {
            remote(ids, onDeleted);
            return;
        }

        var todoListItemId = ids.todo,
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

module.exports = TodoService;