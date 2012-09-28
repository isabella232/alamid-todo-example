"use strict";

var alamid = require("alamid"),
    Service = alamid.Service;

//TodoListItem.find( function (err, todoListItems) { console.log(err, todoListItems) } );
//TodoListItem.find({}, function (err, todoListItems) { console.log(err, todoListItems) });

var id = 0;

var TodoListItemService = Service.define("TodoListItemService", {

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Model} model
     * @param {Function} onCreated
     */
    create: function (remote, ids, model, onCreated) {

        //model.validate(function onValidationFinished(result) { });

        onCreated({
            status: "success",
            data: {"id": id++ } //db id
        })
    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onRead
     */
    read: function (remote, ids, onRead) {

        //request server service
        /*
        if (typeof remote === "function") {
            remote(ids, onRead)
        }
        */

        //dummy
        onRead({
            status: "success",
            data:  { "id": 0, title: "Create read service" }
        })

    },


    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Object} params
     * @param {Function} onReadCollection
     */
    readCollection: function (remote, ids, params, onReadCollection) {

        //dummy
        onReadCollection({
            status: "success",
            data: []
            /*
            data: [{
                "id": 1,
                "title": "Create readCollection service 1"
            }, {
                "id": 2,
                "title": "Create readCollection service 2"
            }]
            */
        });

    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object}ids
     * @param {Model} model
     * @param {Function} onUpdated
     */
    update: function (remote, ids, model, onUpdated) {

    },

    /**
     * @param {Boolean|Function} remote
     * @param {Object} ids
     * @param {Function} onDeleted
     */
    delete: function (remote, ids, onDeleted) {

        onDeleted({
            status: "success",
            data: {}
        });
    }

});

module.exports = TodoListItemService;