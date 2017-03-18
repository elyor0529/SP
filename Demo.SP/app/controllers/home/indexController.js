(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("homeController", homeCtrl);

    //injections
    homeCtrl.$inject = ["$rootScope", "$scope"];

    function homeCtrl($rootScope, $scope) {

        // initialize your users data
        (function() {

            $rootScope.title = "Home";

        })();

    }

})();