(function () {

    "use strict";

    //defining angularjs module
    var app = angular.module("app", ["ui.router", "LocalStorageModule", "ngCookies", "angular-loading-bar", "jcs-autoValidate",  "angular.filter"]);

    //global service
    app.constant("utility", {
        baseAddress: "http://localhost:19201" 
    });

    //manual bootstrap
    app.init = function () {
        angular.bootstrap(document, ["app"]);
    };

    //config 
    app.config(["$locationProvider", "$httpProvider", "$stateProvider", "$urlRouterProvider", "utility", function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, utility) {

        //http provider. 
        $httpProvider.interceptors.push("authInterceptorService");

        //default url
        $urlRouterProvider.otherwise("/login");

        //states
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "../app/views/account/login.html",
                controller: "loginController",
                anonymous: true
            })
             .state("messagelist", {
                 url: "/message/list?{user}",
                 templateUrl: "../app/views/message/list.html",
                 controller: "messagelistController",
                 authenticated: true,
                 params: {
                     user: "guest"
                 }
             });

    }]);

    app.run(["$rootScope", "$location", "utility", "accountService",  function ($rootScope, $location, utility, accountService) {
          
        $rootScope.pageLoaging = false;

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            $rootScope.pageLoaging = true;
            if (!toState.anonymous) {
                if (toState.authenticated && !accountService.authentication.isAuth)
                    $location.path("/login");
            }

            console.warn("$stateChangeStart to " + toState.to + "- fired when the transition begins. toState,toParams : \n", toState, toParams);
        });
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams) {

            console.error("$stateChangeError - fired when an error occurs during transition.", arguments);
        });
        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {

            $rootScope.pageLoaging = false;

            console.log("$stateChangeSuccess to " + toState.name + "- fired once the state transition is complete.");
        });
        $rootScope.$on("$viewContentLoading", function (event, viewConfig) {

            console.log("$viewContentLoading - view begins loading - dom not rendered", viewConfig);
        });
        $rootScope.$on("$viewContentLoaded", function (event) {

            $rootScope.projectTitle = utility.projectTitle;
            $rootScope.releaseYear = utility.releaseYear;
            $rootScope.buildVersion = utility.buildVersion;

            $rootScope.error = null;
            $rootScope.message = null;

            console.log("$viewContentLoaded - fired after dom rendered", event);
        });
        $rootScope.$on("$stateNotFound", function (event, unfoundState, fromState, fromParams) {

            console.warn("$stateNotFound " + unfoundState.to + "  - fired when a state cannot be found by its name.", unfoundState, fromState, fromParams);
        });

        $rootScope.authentication = accountService.fillAuthData();
        $rootScope.logOut = accountService.logOut;

    }]);

})();