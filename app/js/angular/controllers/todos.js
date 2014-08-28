/* globale angular */
angular.module("app").controller("TodosController", function($scope){
   'use strict';

   $scope.todos = [
     { body: 'Go to the store', completed: true },
     { body: 'Test Angular', completed: false },
     { body: 'Learn Angularjs', completed: false }
   ];

   $scope.remaining = function(){
     var count = 0;

     angular.forEach($scope.todos, function(todo){
      count += todo.completed ? 0 : 1;
     });

     return count;
   };

   $scope.addTodo = function(){
    var todo = {
      body: $scope.newTodoBody,
      completed: false
    };

    $scope.todos.push(todo);
   };

});
