(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("cookieuseController", cookieuseCtrl);

    //injections
    cookieuseCtrl.$inject = ["$rootScope", "$scope"];

    function cookieuseCtrl($rootScope, $scope) {

        // initialize your users data
        (function() {

            $rootScope.title = "Cookie Use";

        })();

    }

})();