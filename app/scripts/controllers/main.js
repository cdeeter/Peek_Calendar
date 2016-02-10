(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name peekCalendarApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the peekCalendarApp
     */
    angular.module('peekCalendarApp')

    .controller('MainCtrl', function($state) {
        var self = this;
        
        // Default calendar view is the full calendar
        self.calendarView = 'fullWeek';
        
        // Change the calendar view from
        self.changeView = function(view) {
            var dayOrWeekView = view === "fullWeek";
            var state = dayOrWeekView ? "main.fullWeek" : "main.day";
            dayOrWeekView ? $state.go(state) : $state.go(state, {"date": view});
        };
        
        $state.go('main.fullWeek');
    });
})();