(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name peekCalendarApp.controller:CalendarCtrl
     * @description Control what's displayed on the calendar
     * # CalendarCtrl
     * Controller of the peekCalendarApp
     */
    angular.module('peekCalendarApp')

    .controller('CalendarCtrl', function($state, $stateParams, eventsForDate) {
        var self = this;
        
        // Calendar data from JSON file
        self.data = eventsForDate;
        
        // Days of the week
        self.dayList = ['Monday', 'Tuesday', 'Wednesday'];

        // Display date from the stateParams
        self.date = $stateParams.date;
        
        // Check if first and previous times overlap
        self.checkOverlap = function(event, day) {
            // If the day was sent, the function call is coming from the all_days page, so
            // self.data contains ALL timeslots. It is necessary to isolate the timeslots for the
            // particular day (self.data[day]). Otherwise, self.data only contains the timeslots for that day.
            var eventData = day ? self.data[day] : self.data;
            var eventIndex = eventData.indexOf(event);
            var prevEvent = eventData[eventIndex-1];
            // Check if there's a previous event, and if the start time is the same as
            // the last start time OR if the start time is less than or equal to the previous time,
            // the times overlap so pull the div to the right.
            var check = prevEvent ? (event.start === prevEvent.start || event.start <= prevEvent.end) : false;
            return check;
        };
    })
    
    // Display the events next to the correct time
    .filter('checkTime', function($filter) {
        return function(items, time) {
            var times = [];
            angular.forEach(items, function(item) {
                // Filter for the items that match the time in the timeList that's being interated over
                var inputConverted = $filter('date')(item.start, 'h:mm a');
                if (inputConverted === time) {
                    times.push(item);
                }
            });
            return times;
        };
    });
})();