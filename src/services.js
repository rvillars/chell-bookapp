'use strict';

var bookapp = angular.module('chell-bookapp');

bookapp.factory('Book', function ($resource) {
    return $resource('http://localhost:8080/rest/books/:bookId', {bookId: '@id'}, {
        'update': {method: 'PUT'}
    });
});

bookapp.factory('Author', function ($resource) {
    return $resource('http://localhost:8080/rest/authors/:authorId', {authorId: '@id'}, {
        'update': {method: 'PUT'}
    });
});