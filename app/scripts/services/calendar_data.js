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

    .service('CalendarData', function($http, $filter, $q) {
        var self = this;
        
        // Store the calendar events
        self.events = [];
        
        // Get the calendar events
        self.get = function(date) {
            // Set up var space for eventData to be set
            var eventData;
            // Save the events in a variable
            var events = self.events;
            // Function to set the eventData
            var setEventData = function(allEvents) {
                eventData = date ? events[date] : allEvents;
            };
            // Set the events if they're not yet set
            // Otherwise, just return the events
            if (self.events.length === 0) {
                self.set().then(function(fromCalendarData) {
                    setEventData(fromCalendarData);
                });
            } else {
                setEventData(events);
            }
            return eventData;
        };
        
        // Set the calendar events
        self.set = function() {
            var deferred = $q.defer();
            // Get the calendar data from the JSON file
            $http.get('data/event_data.json').success(function(data) {
                var orderedEvents = {};
                var timeslots = data.timeslots;
                // Reorder data so that it's split by date
                for (var i = 0; i < timeslots.length; i++) {
                    var filteredDate = $filter('date')(timeslots[i].start, 'd');
                    if (orderedEvents.hasOwnProperty(filteredDate)) {
                        orderedEvents[filteredDate].push(timeslots[i]);
                    } else {
                        orderedEvents[filteredDate] = [timeslots[i]];
                    }
                }
                // Set the events
                self.events = orderedEvents;
                // Return the events in the promise response
                deferred.resolve(orderedEvents);
                return deferred.promise;
            });
        };
    });
})();