(function() {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("profileController", profileCtrl);

    //injections
    profileCtrl.$inject = ["$rootScope", "$scope", "utilityService", "accountService"];

    function profileCtrl($rootScope, $scope, utilityService, accountService) {

        var authData = accountService.fillAuthData();

        $scope.userData = {
            email: authData.email,
            firstName: "",
            lastName: "",
            title: "",
            phone: "",
            address: ""
        };
        $scope.save = save;

        // initialize your users data
        (function() {

            $rootScope.title = "Profile";

            accountService.profile()
                .then(function(response) {

                    $scope.userData.email = response.data.email;
                    $scope.userData.firstName = response.data.firstName;
                    $scope.userData.lastName = response.data.lastName;
                    $scope.userData.title = response.data.title;
                    $scope.userData.phone = response.data.phone;
                    $scope.userData.address = response.data.address;

                })
                .catch(function(response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });

        })();

        function save() {
            accountService.save($scope.userData)
                .then(function(response) {

                    $rootScope.message = "Profile has been changed.";

                    utilityService.redirectTo("profile");
                })
                .catch(function(response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });
        }

    }

})();