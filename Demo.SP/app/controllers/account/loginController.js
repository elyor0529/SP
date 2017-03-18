(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("loginController", loginCtrl);

    //injections
    loginCtrl.$inject = ["$rootScope", "$scope", "$location", "accountService"];

    function loginCtrl($rootScope, $scope, $location, accountService) {

        $scope.loginData = {
            email: "",
            password: ""
        };
        $scope.login = login;

        // initialize your users data
        (function() {

            $rootScope.title = "Login";

        })();

        function login() {

            accountService.login($scope.loginData)
                .then(function(response) {

                        $scope.gRecaptchaResponse = "";

                        $location.path("/profile");

                    },
                    function(err) {

                        try {

                            var data = JSON.parse(err.error);

                            $scope.email = data.Email;
                            $scope.noconfirmed = true;
                            $rootScope.error = "User no confirmed.";

                        } catch (e) {
                            $rootScope.error = err.error;
                        }

                    });
        }

    }

})();