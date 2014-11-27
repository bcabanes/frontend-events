(function(angular) {
    'use strict';

    angular
        .module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['logger'];

    function Main(logger) {
        /* jshint validthis: true */
        var vm = this;

        vm.controllerName = 'Main controller';

        activate();

        function activate() {
            logger.success('Main controller loaded!', null);
        }
    }
})(angular);
