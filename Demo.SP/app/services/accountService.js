(function () {

    "use strict";

    var app = angular.module("app");

    //factories
    app.factory("accountService", accountSrvc);

    //injections
    accountSrvc.$inject = ["$q", "$http", "localStorageService", "utility"];

    function accountSrvc($q, $http, localStorageService, utility) {

        var accountServiceFactory = {};
        var authentication = {
            isAuth: false,
            username: ""
        };

        accountServiceFactory.fillAuthData = fillAuthData;
        accountServiceFactory.logOut = logOut;
        accountServiceFactory.login = login;
        accountServiceFactory.authentication = authentication;

        return accountServiceFactory;

        function fillAuthData() {

            var authData = localStorageService.get("authorizationData");

            if (authData) {
                authentication.isAuth = true;
                authentication.username = authData.username;

                return authentication;
            }

            return null;
        }

        function logOut() {

            localStorageService.remove("authorizationData");

            authentication.isAuth = false;
            authentication.username = "";

        }

        function login(loginData) {

            authentication.isAuth = true;
            authentication.username = loginData.username;

            localStorageService.set("authorizationData",
            {
                username: authentication.username
            });  
           
        }

    }

})();