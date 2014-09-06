/* global angular */
'use strict';

(function(){

  var ConferencesAPI = ['$http', function($http){
    var API = {
      getConferences: function(){
        return $http({
          method: 'GET',
          url: '/js/entities/conferences.json'
        });
      }
    };

    return API;
  }];

  angular.module('conferences.factories')
    .factory('conferencesAPI', ConferencesAPI);
})();
