(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("forgotpasswordController", forgotpasswordCtrl);

    //injections
    forgotpasswordCtrl.$inject = ["$rootScope", "$scope", "accountService", "utilityService"];

    function forgotpasswordCtrl($rootScope, $scope, accountService, utilityService) {

        $scope.forgotpasswordData = {
            email: "",
            callbackUrl: utilityService.getUrl("resetpassword")
        };
        $scope.forgotpassword = forgotpassword;

        // initialize your users data
        (function() {

            $rootScope.title = "Forgot your password?";

        })();

        function forgotpassword() {

            accountService.forgotpassword($scope.forgotpasswordData)
                .then(function(response) {

                        $rootScope.message = "Please check your email to reset your password.";
                        $scope.forgotpasswordData = null;
                        $scope.gRecaptchaResponse = "";

                        utilityService.redirectTo("login");
                    },
                    function(response) {
                        $rootScope.error = utilityService.throwErrors(response);
                    });
        }

    }

})();