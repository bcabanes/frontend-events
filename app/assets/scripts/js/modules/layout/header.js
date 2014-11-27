(function(angular) {
    'use strict';

    angular
        .module('app.layout')
        .controller('Header', Header);

    Header.$inject = ['logger'];

    function Header(logger) {
        /* jshint validthis: true */
        var vm = this;
        vm.customSetting = 'custom setting string';

        activate();

        function activate() {
            logger.success('Header controller loaded!', null);
        }
    }
})(angular);
