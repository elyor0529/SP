(function () {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("messagelistController", messagelistCtrl);

    //injections
    messagelistCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "$window", "$http", "$q", "messageService", "utilityService", "bootstrap3ElementModifier"];

    function messagelistCtrl($rootScope, $scope, $stateParams, $window, $http, $q, messageService, utilityService, bootstrap3ElementModifier) {

        bootstrap3ElementModifier.enableValidationStateIcons(false);
        $scope.messageData = {
            name: "",
            text: ""
        };

        $scope.add = add;
        $scope.page = $stateParams.page; 
        $scope.list = list;
        $scope.remove = remove;

        // initialize your users data
        (function () {

            $rootScope.title = "List of messages";

            list();

        })();
         
        function remove(){
            
            messageService.remove($stateParams.id)
                .then(function(response) {

                    $rootScope.message = "Message deleted successfully.";

                    utilityService.redirectTo("message/list");

                })
                .catch(function(response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });
        }
         
        function list() {
            messageService.list($scope.page)
                .then(function (response) {

                    $scope.messageData = response.data.items;
                    $scope.pager = response.data.pager;

                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });
        }

        function add() {

            messageService.add($scope.messageData)
                .then(function (response) {
                    $rootScope.message = "Message successfully saved.";

                    utilityService.redirectTo("message/list");
                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });

        }
    }

})();