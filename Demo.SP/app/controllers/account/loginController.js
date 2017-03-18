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
                     
                        $location.path("/message/list");

                    },
                    function(err) {

                        try {

                            var data = JSON.parse(err.error);

                            $scope.email = data.Email; 
                            $rootScope.error = "User no confirmed.";

                        } catch (e) {
                            $rootScope.error = err.error;
                        }

                    });
        }

    }

})();