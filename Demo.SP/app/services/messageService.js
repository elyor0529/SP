(function () {

    "use strict";

    var app = angular.module("app");

    //factories
    app.factory("messageService", messageSrvc);

    //injections
    messageSrvc.$inject = ["$q", "$http", "localStorageService", "utility"];

    function messageSrvc($q, $http, localStorageService, utility) {

        var serviceFactory = {};

        serviceFactory.list = list;
        serviceFactory.add = add;
        serviceFactory.edit = edit;
        serviceFactory.details = details;
        serviceFactory.remove = remove;

        return serviceFactory;

        function list(page, search, column, sort) {

            return $http.get(utility.baseAddress + "/api/message/list?page=" + page + "&search=" + search + "&column=" + column + "&sort=" + sort)
                .then(function (response) {
                    return response;
                });
        }

        function add(messageData) {

            return $http.post(utility.baseAddress + "/api/message/add", messageData)
                .then(function (response) {
                    return response;
                });
        }

        function edit(messageData) {

            return $http.put(utility.baseAddress + "/api/message/edit", messageData)
                .then(function (response) {
                    return response;
                });
        }

        function details(id) {

            return $http.get(utility.baseAddress + "/api/message/details/" + id)
                .then(function (response) {
                    return response;
                });
        }

        function remove(id) {

            return $http.delete(utility.baseAddress + "/api/message/remove/" + id)
                .then(function (response) {
                    return response;
                });
        }
         
    }

})();