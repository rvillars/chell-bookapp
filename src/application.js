'use strict';

var bookapp = angular.module('chell-bookapp', ['templates-chell-bookapp', 'ui.bootstrap', 'ui.router', 'ngResource']);

bookapp.config(function config( $stateProvider ) {
    $stateProvider.state( 'bookapp', {
        url: '/bookapp',
        views: {
            'main': {
                controller: 'BookappController',
                templateUrl: 'templates/bookapp.tpl.html'
            }
        },
        data:{ pageTitle: 'Bookapp' }
    });
});