(function () {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("messagelistController", messagelistCtrl);

    //injections
    messagelistCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "$window", "$http", "$q", "messageService", "utilityService", "bootstrap3ElementModifier"];

    function messagelistCtrl($rootScope, $scope, $stateParams, $window, $http, $q, messageService, utilityService, bootstrap3ElementModifier) {

        bootstrap3ElementModifier.enableValidationStateIcons(false);

        $scope.page = $stateParams.page;
        $scope.search = $stateParams.search;
        $scope.searching = searching;
        $scope.list = list;
        $scope.sorting = sorting;
        $scope.reset = reset;
        $scope.sort = $stateParams.sort;
        $scope.column = $stateParams.column; 

        // initialize your users data
        (function () {

            $rootScope.title = "List of messages";

            list();

        })();

        function reset() {
            $scope.search = "";

            list();
        }

        function searching() {

            $window.location.href = "#/message/list?page=" + $scope.page + "&search=" + $scope.search + "&column=" + $scope.column + "&sort=" + $scope.sort;
        }

        function sorting(column) {

            $scope.column = column;

            if ($scope.sort === "asc") {
                $scope.sort = "desc";
            } else {
                $scope.sort = "asc";
            }
        }
         
        function list() {
            messageService.list($scope.page, $scope.search, $scope.column, $scope.sort)
                .then(function (response) {

                    $scope.messageData = response.data.items;
                    $scope.pager = response.data.pager;

                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });
        }
    }

})();