(function () {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("messageaddController", messageaddCtrl);

    //injections
    messageaddCtrl.$inject = ["$rootScope", "$scope", "$window", "messageService", "bootstrap3ElementModifier", "utilityService"];

    function messageaddCtrl($rootScope, $scope, $window, messageService, bootstrap3ElementModifier, utilityService) {

        bootstrap3ElementModifier.enableValidationStateIcons(false);

        $scope.messageData = {
            name: "",
            text: ""
        };
        $scope.add = add;

        // initialize your users data
        (function () {

            $rootScope.title = "Add message";

        })();

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