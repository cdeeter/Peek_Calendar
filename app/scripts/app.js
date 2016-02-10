(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name peekCalendarApp
     * @description
     * # peekCalendarApp
     *
     * Main module of the application.
     */
    angular.module('peekCalendarApp', [
        'ngAnimate',
        'ui.router'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/');

        // States
        $stateProvider
        // Main page
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        // Full week view
        .state('main.fullWeek', {
            url: '/',
            templateUrl: 'views/full_week.html',
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
    })
    .run(function($state) {
        // Default to full week when the app starts
        $state.go('main.fullWeek');
    });
})();