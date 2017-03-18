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

        accountServiceFactory.signup = signup;
        accountServiceFactory.fillAuthData = fillAuthData;
        accountServiceFactory.logOut = logOut;
        accountServiceFactory.login = login;
        accountServiceFactory.forgotpassword = forgotpassword;
        accountServiceFactory.profile = profile;
        accountServiceFactory.save = save;
        accountServiceFactory.resetpassword = resetpassword;
        accountServiceFactory.confirm = confirm;
        accountServiceFactory.verification = verification;
        accountServiceFactory.authentication = authentication;

        return accountServiceFactory;

        function signup(signupData) {

            logOut();

            return $http.post(utility.baseAddress + "/api/account/register", signupData)
                .then(function(response) {
                    return response;
                });

        }

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

            $http.post(utility.baseAddress + "/token",
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

        function forgotpassword(forgotpasswordData) {

            return $http.post(utility.baseAddress + "/api/account/forgotpassword", forgotpasswordData)
                .then(function(response) {
                    return response;
                });
        }

        function profile() {

            return $http.get(utility.baseAddress + "/api/account/userinfo")
                .then(function(response) {
                    return response;
                });
        }

        function save(userData) {

            return $http.post(utility.baseAddress + "/api/account/save", userData)
                .then(function(response) {
                    return response;
                });
        }

        function resetpassword(resetpasswordData) {

            return $http.post(utility.baseAddress + "/api/account/resetpassword", resetpasswordData)
                .then(function(response) {
                    return response;
                });
        }

        function confirm(confirmData) {

            return $http.post(utility.baseAddress + "/api/account/confirmemail", confirmData)
                .then(function(response) {
                    return response;
                });
        }

        function verification(verificationData) {

            return $http.post(utility.baseAddress + "/api/account/verificationemail", verificationData)
                .then(function(response) {
                    return response;
                });
        }

    }

})();