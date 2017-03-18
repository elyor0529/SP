(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("signupController", signupCtrl);

    //injections
    signupCtrl.$inject = ["$rootScope", "$scope", "accountService", "utilityService"];

    function signupCtrl($rootScope, $scope, accountService, utilityService) {

        $scope.registrationData = {
            email: "",
            password: "",
            confirmpassword: "",
            callbackUrl: utilityService.getUrl("confirmemail")
        };
        $scope.signup = signup;

        // initialize your users data
        (function() {

            $rootScope.title = "Sign up";

        })();

        function signup() {

            accountService.signup($scope.registrationData)
                .then(function(response) {

                        $rootScope
                            .message =
                            "An email has been sent to your account.Please view the email and confirm your account to complete the registration process.";

                        $scope.registrationData = null;
                        $scope.gRecaptchaResponse = "";

                        utilityService.redirectTo("login");
                    },
                    function(response) {
                        $rootScope.error = utilityService.throwErrors(response);
                    });
        }

    }

})();