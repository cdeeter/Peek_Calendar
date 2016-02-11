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
        
        // Times for display
        self.timeList = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
                         '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
                         '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
                         '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
                         '9:00 PM', '9:30 PM', '10:00 PM'];

        // Display date from the stateParams
        self.date = $stateParams.date;
        
        // Check if first and previous times overlap
        self.checkOverlap = function(event) {
            var eventData = self.data;
            var eventIndex = eventData.indexOf(event);
            var prevEvent = eventData[eventIndex-1];
            // Check if there's a previous event, and if the start time is the same as
            // the last start time OR if the start time is less than or equal to the previous time,
            // the times overlap so pull the div to the right
            var check = prevEvent ? (event.start === prevEvent.start || event.start <= prevEvent.end) : false;
            return check;
        };
    })
    
    // Display the events next to the correct time
    .filter('checkTime', function($filter) {
        return function(items, time) {
            var times = [];
            angular.forEach(items, function(item) {
                // Filter for the items that match the time in the timeList
                // that's being interated over
                var inputConverted = $filter('date')(item.start, 'h:mm a');
                if (inputConverted === time) {
                    times.push(item);
                }
            });
            return times;
        };
    });
})();