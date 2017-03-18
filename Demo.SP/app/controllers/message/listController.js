(function () {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("messagelistController", messagelistCtrl);

    //injections
    messagelistCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "$window", "$http", "$q", "messageService", "utilityService", "bootstrap3ElementModifier", "accountService"];

    function messagelistCtrl($rootScope, $scope, $stateParams, $window, $http, $q, messageService, utilityService, bootstrap3ElementModifier, accountService) {

        bootstrap3ElementModifier.enableValidationStateIcons(false);
        $scope.messageData = {
            id: 0,
            name: "",
            text: ""
        };
         
        $scope.list = list;
        $scope.remove = remove;
        $scope.save = save; 
        $scope.details = details;

        // initialize your users data
        (function () {

            $rootScope.title = "List of messages";

            list();

        })();

        function remove(id) {

            messageService.remove(id)
                .then(function (response) {

                    $rootScope.message = "Message deleted successfully.";

                    list();

                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });
        }

        function details(id) {

            messageService.details(id)
                .then(function (response) {

                    $scope.messageData = response.data;

                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });
        }

        function list() {
            messageService.list(accountService.authentication.username)
                .then(function (response) {

                    $scope.messageList = response.data;

                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });
        }
         
        function save() {

            $scope.messageData.user = accountService.authentication.username;
            
            if ($scope.messageData.id == 0) {
                messageService.add($scope.messageData)
                    .then(function (response) {
                        $rootScope.message = "Message successfully saved.";

                        $scope.messageData = {
                            id: 0,
                            name: "",
                            text: ""
                        };
                        list(); 
                    })
                    .catch(function (response) {
                        $rootScope.error = utilityService.throwErrors(response);
                    });
            } else {
                messageService.edit($scope.messageData)
               .then(function (response) {
                   $rootScope.message = "Message successfully saved.";
                   $scope.messageData = {
                       id: 0,
                       name: "",
                       text: ""
                   };
                   list(); 
               })
               .catch(function (response) {
                   $rootScope.error = utilityService.throwErrors(response);
               });

            }

        }
    }

})();