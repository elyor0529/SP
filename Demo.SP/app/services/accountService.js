(function() {

    "use strict";

    var app = angular.module("app");

    //factories
    app.factory("accountService", accountSrvc);

    //injections
    accountSrvc.$inject =["$q","$http","localStorageService","utility"];

    function accountSrvc($q, $http, localStorageService, utility) {

        var accountServiceFactory = {};
        var authentication = {
            isAuth: false,
            email: "",
            token: ""
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
                authentication.email = authData.email;
                authentication.token = authData.token;

                return authentication;
            }

            return null;
        }

        function logOut() {

            localStorageService.remove("authorizationData");

            authentication.isAuth = false;
            authentication.email = "";
            authentication.token = "";

        }

        function login(loginData) {

            var data = "grant_type=password&username=" + loginData.email + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(utility.baseAddress + "/account/login",
                    data,
                    {
                        headers: {
                            'Content-Type': "application/x-www-form-urlencoded"
                        }
                    })
                .success(function(response) {

                    authentication.isAuth = true;
                    authentication.email = loginData.email;
                    authentication.token = response.access_token;

                    localStorageService.set("authorizationData",
                    {
                        email: authentication.email,
                        token: authentication.token
                    });

                    deferred.resolve(response);

                })
                .error(function(err, status) {
                    logOut();
                    deferred.reject(err);
                });

            return deferred.promise;
        } 

    }

})();