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
            // Save the events in a var
            var events = self.events;
            // Function to set the eventData
            var setEventData = function(allEvents) {
                eventData = date ? $filter('filter')(events, {'start': date}) : allEvents;
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
            $http.get('data/calendar_data.json').success(function(data) {
                // Set the events
                self.events = data.timeslots;
                // Return the events in the promise response
                deferred.resolve(data.timeslots);
                return deferred.promise;
            });
        };
    });
})();