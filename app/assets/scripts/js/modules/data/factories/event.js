(function(angular){
    'use strict';

    angular
        .module('app.data')
        .factory('eventData', factory);

    factory.$inject = ['$http', '$location', 'exception', 'logger'];

    function factory($http, $location, $q, exception, logger) {

        var service = {
            'getEvents': getEvents
        };

        return service;
        ///////////////


        function getEvents() {
            return $http.get('/assets/mockdata/conferences.json')
            .then(getEventsComplete)
            .catch(function(message){
                exception.catcher('XHR Failed for getEvents')(message);
            });

            function getEventsComplete(data, status, header, config) {
                return data.data;
            }
        }
    }
})(angular);
