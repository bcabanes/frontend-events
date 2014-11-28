/* global angular */
(function(angular){
  'use strict';

  var getRoutes = function(){
    return [
      {
        url: '/helloworld',
        config: {
          templateUrl: '/assets/partials/helloworld/helloworld.html',
          controller: 'Helloworld',
          controllerAs: 'vm',
          title: 'helloworld',
          settings: {
            customData: true
          }
        }
      }
    ];
  };

  var appRun = function(routehelper){
    routehelper.configureRoutes(getRoutes());
  };
    /**
     * Dependecy injection for mangling
     * This preserve variable integrity
     * @type{Array}
     */
    appRun.$inject = ['routehelper'];

  /**
   * Add to the module
   */
  angular
    .module('app.helloworld')
    .run(appRun);

})(angular);
