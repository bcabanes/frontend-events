/* global angular */
'use strict';

(function(){

  var ListController = ['$scope', 'conferencesAPI', function($scope, conferencesAPI){
    $scope.conferenceFilter = null;
    $scope.searchFilter = null;
    $scope.conferencesList = [];
    $scope.nbConferences = 0;

    /**
     * Load data from API
     */
    conferencesAPI.getConferences().success(function(data){
      $scope.conferencesList = data;
      $scope.nbConferences = data.length;
    });

  }];

  angular.module('conferences.controllers')
    .controller('conferencesListController', ListController);
})();
