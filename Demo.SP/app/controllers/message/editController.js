(function () {

    "use strict";

    var app = angular.module("app");

    //controllers
    app.controller("messageeditController", messageeditCtrl);

    //injections
    messageeditCtrl.$inject = ["$rootScope", "$scope", "$stateParams", "messageService", "utilityService", "bootstrap3ElementModifier"];

    function messageeditCtrl($rootScope, $scope, $stateParams, messageService, utilityService, bootstrap3ElementModifier) {

        bootstrap3ElementModifier.enableValidationStateIcons(false);

        $scope.messageData = {};
        $scope.edit = edit;

        // initialize your users data
        (function () {

            $rootScope.title = "Edit messages";

            messageService.details($stateParams.id)
                .then(function (response) {

                    $scope.messageData = response.data;
                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);
                });

        })();

        function edit() {

            messageService.edit($scope.messageData)
                .then(function (response) {
                    $rootScope.message = "Messages successfully saved.";

                    utilityService.redirectTo("message/list");
                })
                .catch(function (response) {
                    $rootScope.error = utilityService.throwErrors(response);

                    if ($scope.files.length > 0) {
                        $scope.messageData.picturePath = $scope.files[0].name;
                    }
                });

        }

    }

})();