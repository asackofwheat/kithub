"use strict";
var Lesson = angular.module('Lesson', ["ui.router", "restangular", "Devise"]);

angular.module('Lesson').factory('_', ['$window', function($window) {
  return $window._;
}]);

angular.module('Lesson').config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

// config for restangular
angular.module('Lesson').config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);

angular.module('Lesson').
    config(['AuthProvider', function(AuthProvider) {
        AuthProvider.loginPath('teachers/sign_in.json');
        AuthProvider.loginMethod('POST');
        AuthProvider.resourceName('teacher');
    }]);

//routes
angular.module('Lesson').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider
	 .state('main',{
    url: '',
    abstract: true,
    template: "<div ui-view></div>",
		resolve: {
			currentUser: ['Auth', '$state', function(Auth, $state){
            return Auth.currentUser()
            .then(function(user){
              return user;
            });
          }]
       	}
		})

   .state('main.dashboard', {
      url: "/dashboard",
      templateUrl: "lesson_templates/teacher/teacher_show.html",
      controller: "TeacherShowCtrl",
      resolve: {
        teacher: ["currentUser", function(currentUser){
            return currentUser;
        }]
      }
    })

		.state('main.teachers', {
			abstract: true,
			url:'/teachers',
			template: "<div ui-view></div>"
		})
		.state('main.lessons', {
			abstract: true
		})
		// .state('main.lessons.show')
		// .state('main.lessons.new')
		// .state('main.lessons.pullrequests')
		.state('main.teachers.show', {
			url: '/:id',
			templateUrl: "lesson_templates/teacher/teacher_show.html",
			controller: "TeacherShowCtrl",
			resolve: {
	      teacher: ["$stateParams", "TeacherService", function($stateParams, TeacherService){
	        	return TeacherService.getTeacher($stateParams.id);
	      }]
			}
		});

}]);

angular.module('Lesson').run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.error.bind(console));
});