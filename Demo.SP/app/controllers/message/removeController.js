(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("messageremoveController", messageremoveCtrl);

    //injections
    messageremoveCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "messageService", "utilityService"];

    function messageremoveCtrl($rootScope, $scope, $stateParams, messageService, utilityService) {

        // initialize your users data
        (function() {

            $rootScope.title = "Deleting confirmation message...";

            messageService.remove($stateParams.id)
                .then(function(response) {

                    $rootScope.message = "Message deleted successfully.";

                    utilityService.redirectTo("message/list");

                })
                .catch(function(response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });

        })();

    }

})();