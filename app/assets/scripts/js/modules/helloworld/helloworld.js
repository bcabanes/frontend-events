/* global angular */
(function(angular) {
    'use strict';

    var Helloworld = function(logger){
        /*jshint validthis: true */
        // var vm = this;

      function activate(){
        logger.info('Activated Helloworld View');
      }

      activate();
    };
      /**
       * Dependecy injection for mangling
       * This preserve variable integrity
       * @type{Array}
       */
      Helloworld.$inject = ['logger'];

    /**
     * Add to the module
     */
    angular
      .module('app.helloworld')
      .controller('Helloworld', Helloworld);
})(angular);
