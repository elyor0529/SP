(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("verificationemailController", verificationemailCtrl);

    //injections
    verificationemailCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "accountService", "utilityService"];

    function verificationemailCtrl($rootScope, $scope, $stateParams, accountService, utilityService) {

        $scope.verificationData = {
            email: $stateParams.email,
            callbackUrl: utilityService.getUrl("confirmemail")
        };

        // initialize your users data
        (function() {

            $rootScope.title = "Verification your account";

            accountService.verification($scope.verificationData)
                .then(function(response) {

                    $rootScope.message = "Thank you for verification.";
                    $scope.verificationData = null;

                    utilityService.redirectTo("login");
                })
                .catch(function(response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });

        })();

    }

})();