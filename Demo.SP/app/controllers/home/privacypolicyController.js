(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("privacypolicyController", privacypolicyCtrl);

    //injections
    privacypolicyCtrl.$inject = ["$rootScope", "$scope"];

    function privacypolicyCtrl($rootScope, $scope) {

        // initialize your users data
        (function() {

            $rootScope.title = "Privacy Policy";

        })();

    }

})();