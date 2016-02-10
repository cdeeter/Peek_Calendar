(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name peekCalendarApp.controller:CalendarCtrl
     * @description
     * # CalendarCtrl
     * Controller of the peekCalendarApp
     */
    angular.module('peekCalendarApp')

    .controller('CalendarCtrl', function($stateParams, eventsForDate) {
        var self = this;
        console.log(eventsForDate);
        // Calendar data from JSON file
        self.data = eventsForDate;

        // Display date from the stateParams
        self.date = $stateParams.date;
    });
})();