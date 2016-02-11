(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name peekCalendarApp.controller:MainCtrl
     * @description Controls the main page and the dropdown
     * # MainCtrl
     * Controller of the peekCalendarApp
     */
    angular.module('peekCalendarApp')

    .controller('MainCtrl', function($state) {
        var self = this;
        
        // Times for display
        self.timeList = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
                         '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
                         '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'];
        
        // Default calendar view is the full calendar
        self.calendarView = 'allDays';
        
        // Change the calendar view from
        self.changeView = function(view) {
            var showWeek = view === 'allDays';
            var state = showWeek ? 'main.allDays' : 'main.day';
            if (showWeek) {
                $state.go(state);
            } else {
                $state.go(state, {date: view});
            }
        };
        
    })
    .run(['$state', '$rootScope', '$timeout', function ($state, $rootScope, $timeout) {
      $timeout(function() { $state.go('main.allDays'); });   
    }]);
    
})();