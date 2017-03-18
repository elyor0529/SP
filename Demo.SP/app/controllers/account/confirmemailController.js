(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("confirmemailController", confirmemailCtrl);

    //injections
    confirmemailCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "accountService", "utilityService"];

    function confirmemailCtrl($rootScope, $scope, $stateParams, accountService, utilityService) {

        $scope.confirmData = {
            email: $stateParams.email,
            token: $stateParams.token
        };

        // initialize your users data
        (function() {

            $rootScope.title = "Confirm your account";

            accountService.confirm($scope.confirmData)
                .then(function(response) {

                    $rootScope.message = "Thank you for confirming.";
                    $scope.confirmData = null;

                    utilityService.redirectTo("login");
                })
                .catch(function(response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });

        })();

    }

})();