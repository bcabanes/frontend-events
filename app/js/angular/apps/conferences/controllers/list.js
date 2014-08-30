/* global angular */
'use strict';

(function(){

  var ListController = function($scope, conferencesAPI){
    $scope.conferenceFilter = null;
    $scope.searchFilter = null;
    $scope.conferencesList = [];

    /**
     * Load data from API
     */
    conferencesAPI.getConferences().success(function(data){
      $scope.conferencesList = data;
    });

  };

  angular.module('conferences.controllers', [])
    .controller('conferencesListController', ListController);
})();
