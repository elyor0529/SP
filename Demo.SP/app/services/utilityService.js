(function () {

    "use strict";

    var app = angular.module("app");

    //factories
    app.factory("utilityService", utilitySrvc);

    //injections
    utilitySrvc.$inject = ["$q", "$location", "$timeout", "utility"];

    function utilitySrvc($q, $location, $timeout, utility) {
        return {
            getInstance: function () {
                return utility;
            },
            getUrl: function (path) {
                var protocol = $location.protocol();
                var host = $location.host();
                var port = $location.port();

                return protocol + "://" + host + ":" + port + "/#/" + path;
            },
            redirectTo: function (value) {
                var timer = $timeout(function () {
                    $timeout.cancel(timer);

                    $location.path("/" + value);

                },
                    2000);
            },
            throwErrors: function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }

                return errors.join(" ");
            }
        };
    }

})();