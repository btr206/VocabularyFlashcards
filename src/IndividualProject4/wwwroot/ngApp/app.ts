namespace IndividualProject4 {

    angular.module('IndividualProject4', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: IndividualProject4.Controllers.HomeController,
                controllerAs: 'ctrl'
            })
            .state('secret', {
                url: '/secret',
                templateUrl: '/ngApp/views/secret.html',
                controller: IndividualProject4.Controllers.SecretController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: IndividualProject4.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: IndividualProject4.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('externalRegister', {
                url: '/externalRegister',
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: IndividualProject4.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            })
            .state('viewlist', {
                url: '/viewlist',
                templateUrl: '/ngApp/views/ShowList.html',
                controller: IndividualProject4.Controllers.ShowListController,
                controllerAs: 'ctrl'
            })
            .state('chooselanguage', {
                url: '/chooselanguage',
                templateUrl: '/ngApp/views/ChooseLanguage.html',
                controller: IndividualProject4.Controllers.ChooseLanguageController,
                controllerAs: 'ctrl'
            })
            .state('choosequiz', {
                url: '/choosequiz',
                templateUrl: '/ngApp/views/SelectPracticeList.html',
                controller: IndividualProject4.Controllers.SelectPracticeListController,
                controllerAs: 'ctrl'
            })
            .state('quiz', {
                url: '/quiz',
                templateUrl: '/ngApp/views/Quiz.html',
                controller: IndividualProject4.Controllers.QuizController,
                controllerAs: 'ctrl'
            })
            .state('listtoedit', {
                url: '/listtoedit',
                templateUrl: '/ngApp/views/ListToEdit.html',
                controller: IndividualProject4.Controllers.ChooseListToEditController,
                controllerAs: 'ctrl'
            })
            .state('editlist', {
                url: '/editlist',
                templateUrl: '/ngApp/views/EditList.html',
                controller: IndividualProject4.Controllers.EditListController,
                controllerAs: 'ctrl'                
            })
            .state('edit', {
                url: '/edit',
                templateUrl: '/ngApp/views/Edit.html',
                controller: IndividualProject4.Controllers.EditController,
                controllerAs: 'modal'
            })
            .state('delete', {
                url: '/delete',
                templateUrl: '/ngApp/views/Delete.html',
                controller: IndividualProject4.Controllers.DeleteController,
                controllerAs: 'modal'
            }) 
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: IndividualProject4.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('parse', {
                url: '/parse',
                templateUrl: '/ngApp/views/parse.html',
                controller: IndividualProject4.Controllers.ParseController,
                controllerAs: 'ctrl'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    
    angular.module('IndividualProject4').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('IndividualProject4').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    

}
