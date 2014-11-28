(function(){
    'use strict';

    angular
        .module('app.home')
        .controller('Home', controller);

    controller.$inject = ['$q', 'eventData', 'logger'];

    function controller($q, eventData, logger){

        /* jshint validthis: true */
        var vm = this;

        vm.title = 'Home';
        vm.events = [];
        vm.eventsCount = 0;

        init();
        ///////

        function init() {
            var promises = [getEvents()];
            return $q.all(promises).then(function() {
                logger.info('Activated Home View');
            });
        }

        function getEvents() {
            return eventData.getEvents().then(function(data){
                vm.events = data;
                vm.eventsCount = vm.events.length;
                return vm.events;
            });
        }
    }


})();
