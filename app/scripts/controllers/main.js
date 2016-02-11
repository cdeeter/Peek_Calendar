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