(function () {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("loginController", loginCtrl);

    //injections
    loginCtrl.$inject = ["$rootScope", "$scope", "$location","accountService"];

    function loginCtrl($rootScope, $scope, $location, accountService) {

        $scope.loginData = {
            username: "guest"
        };
        $scope.login = login;

        // initialize your users data
        (function () {

            $rootScope.title = "Login";

        })();

        function login() {

            accountService.login($scope.loginData);

            $location.path("/message/list");
        }

    }

})();