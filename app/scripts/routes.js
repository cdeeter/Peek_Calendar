(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name peekCalendarApp
     * @description Routes for the app
     * # peekCalendarApp
     *
     * Main module of the application.
     */
    angular.module('peekCalendarApp', [
        'ui.router'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        // Application states
        $stateProvider
        
        // Main page
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
            resolve: {
                eventsForDate: function(CalendarData) {
                    // Get all the events
                    return CalendarData.get();
                }
            }
        })
        // Full week view
        .state('main.allDays', {
            templateUrl: 'views/all_days.html',
            controller: 'CalendarCtrl',
            controllerAs: 'week',
            resolve: {
                eventsForDate: function(CalendarData) {
                    // Get all the events
                    return CalendarData.get();
                }
            }
        })
        // Individual day view
        .state('main.day', {
            url: '/:date',
            templateUrl: 'views/day.html',
            controller: 'CalendarCtrl',
            controllerAs: 'day',
            resolve: {
                eventsForDate: function($stateParams, CalendarData) {
                    // Get the events for the specific date
                    var forDate = $stateParams.date;
                    return CalendarData.get(forDate);
                }
            }
        });
    });
})();