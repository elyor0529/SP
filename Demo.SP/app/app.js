(function () {

    "use strict";

    //defining angularjs module
    var app = angular.module("app", ["ui.router", "LocalStorageModule", "ngCookies", "angular-loading-bar", "jcs-autoValidate", "textAngular", "ngFileUpload", "xeditable", "angular.filter"]);

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
        $urlRouterProvider.otherwise("/home");

        //states
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "../app/views/home/index.html",
                controller: "homeController",
                anonymous: true
            })
             .state("cookieuse", {
                 url: "/cookieuse",
                 templateUrl: "../app/views/home/cookieuse.html",
                 controller: "cookieuseController",
                 anonymous: true
             })
             .state("privacypolicy", {
                 url: "/privacypolicy",
                 templateUrl: "../app/views/home/privacypolicy.html",
                 controller: "privacypolicyController",
                 anonymous: true
             })
             .state("termsofservice", {
                 url: "/termsofservice",
                 templateUrl: "../app/views/home/termsofservice.html",
                 controller: "termsofserviceController",
                 anonymous: true
             })
            .state("profile", {
                url: "/profile",
                templateUrl: "../app/views/account/profile.html",
                controller: "profileController",
                authenticated: true
            })
            .state("login", {
                url: "/login",
                templateUrl: "../app/views/account/login.html",
                controller: "loginController",
                anonymous: true
            })
            .state("signup", {
                url: "/signup",
                templateUrl: "../app/views/account/signup.html",
                controller: "signupController",
                anonymous: true
            })
             .state("confirmemail", {
                 url: "/confirmemail?{email}&{token}",
                 templateUrl: "../app/views/account/confirmemail.html",
                 controller: "confirmemailController",
                 anonymous: true
             })
             .state("forgotpassword", {
                 url: "/forgotpassword",
                 templateUrl: "../app/views/account/forgotpassword.html",
                 controller: "forgotpasswordController",
                 anonymous: true
             })
            .state("resetpassword", {
                url: "/resetpassword?{token}",
                templateUrl: "../app/views/account/resetpassword.html",
                controller: "resetpasswordController",
                anonymous: true
            })
            .state("verificationemail", {
                url: "/verificationemail?{email}",
                templateUrl: "../app/views/account/verificationemail.html",
                controller: "verificationemailController",
                anonymous: true
            })
             .state("messagelist", {
                 url: "/message/list?{page:int}&{search}&{column}&{sort}",
                 templateUrl: "../app/views/message/list.html",
                 controller: "messagelistController",
                 anonymous: true,
                 params: {
                     page: 1,
                     search: "",
                     column: "id",
                     sort: "asc"
                 }
             })
            .state("messageadd", {
                url: "/message/add",
                templateUrl: "../app/views/message/add.html",
                controller: "messageaddController",
                authenticated: true
            })
            .state("messageedit", {
                url: "/message/edit?{id:int}",
                templateUrl: "../app/views/message/edit.html",
                controller: "messageeditController",
                authenticated: true
            })
           .state("messageremove", {
               url: "/message/remove?{id:int}",
               templateUrl: "../app/views/message/remove.html",
               controller: "messageremoveController",
               authenticated: true
           });

    }]);

    app.run(["$rootScope", "$location", "utility", "accountService", "editableOptions", function ($rootScope, $location, utility, accountService, editableOptions) {

        // bootstrap3 theme. Can be also 'bs2', 'default'
        editableOptions.theme = "bs3";

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