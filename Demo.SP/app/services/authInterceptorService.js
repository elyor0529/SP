(function() {

    "use strict";

    var app = angular.module("app");

    //factories
    app.factory("authInterceptorService", authInterceptorSrvc);

    //injections
    authInterceptorSrvc.$inject =["$q","$location","localStorageService","utility"];

    function authInterceptorSrvc($q, $location, localStorageService, utility) {

        var authInterceptorServiceFactory = {};

        authInterceptorServiceFactory.request = request;
        authInterceptorServiceFactory.responseError = responseError;

        return authInterceptorServiceFactory;

        function request(config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get("authorizationData");
            if (authData) {
                config.headers.Authorization = "Bearer " + authData.token;
            }

            return config;
        };

        function responseError(rejection) {
            if (rejection.status === 401) {
                $location.path("/login");
            }
            return $q.reject(rejection);
        };

    }

})();