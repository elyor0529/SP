(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("resetpasswordController", resetpasswordCtrl);

    //injections
    resetpasswordCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "accountService", "utilityService"];

    function resetpasswordCtrl($rootScope, $scope, $stateParams, accountService, utilityService) {

        $scope.resetpasswordData = {
            email: "",
            token: $stateParams.token,
            newpassword: "",
            confirmpassword: ""
        };
        $scope.resetpassword = resetpassword;

        // initialize your users data
        (function() {

            $rootScope.title = "Reset password";

        })();

        function resetpassword() {

            accountService.resetpassword($scope.resetpasswordData)
                .then(function(response) {

                        $rootScope.message = "Your password has been reset.";
                        $scope.confirmData = null;
                        $scope.gRecaptchaResponse = "";

                        utilityService.redirectTo("login");
                    },
                    function(response) {
                        $rootScope.error = utilityService.throwErrors(response);
                    });
        }

    }

})();