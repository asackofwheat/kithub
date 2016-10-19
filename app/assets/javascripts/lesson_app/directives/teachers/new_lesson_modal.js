"use strict";
angular.module('Lesson').directive("newLessonModal",  ['LessonService', '$state', function(LessonService, $state) {
  
  return {
    templateUrl:"lesson_templates/directives/new_lesson_modal.html",
    scope: { 
      teacher: "="
    },
    restrict: "E",
    link: function(scope){
      scope.title = "";
      scope.saving = false;

      scope.createLesson = function() {
        scope.saving = true;

        var lesson = {
          title: scope.title,
          content: "",
          version: 1.0,
          hours: 1,
          grade: 0
        };

        LessonService.create(lesson).then(
          function(response) {
            // success
            scope.saving = false;
            scope.goToLesson(response);
          }, 
          function(response) {
            // error
            // TODO Flash error
            scope.saving = false;
          });
      };

      scope.goToLesson = function(lesson) {
        angular.element(document.querySelector('#newLessonModal')).modal('hide');

        // wait for modal to close
        setTimeout(function() { 
          $state.go("main.lessons.show", {id: lesson.id}); }, 200);
        };
    }
  };

}]);