(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("termsofserviceController", termsofserviceCtrl);

    //injections
    termsofserviceCtrl.$inject = ["$rootScope", "$scope"];

    function termsofserviceCtrl($rootScope, $scope) {

        // initialize your users data
        (function() {

            $rootScope.title = "Terms of Service";

        })();

    }

})();