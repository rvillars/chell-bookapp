'use strict';
// Source: build/application.js
var bookapp = angular.module('chell-bookapp', [
    'templates-chell-bookapp',
    'ui.bootstrap',
    'ui.router',
    'ngResource'
  ]);
bookapp.config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('bookapp', {
      url: '/bookapp',
      views: {
        'main': {
          controller: 'BookappController',
          templateUrl: 'templates/bookapp.tpl.html'
        }
      },
      data: { pageTitle: 'Bookapp' }
    });
  }
]);;// Source: build/services.js
var bookapp = angular.module('chell-bookapp');
bookapp.factory('Book', [
  '$resource',
  function ($resource) {
    return $resource('http://localhost:8080/rest/books/:bookId', { bookId: '@id' }, { 'update': { method: 'PUT' } });
  }
]);
bookapp.factory('Author', [
  '$resource',
  function ($resource) {
    return $resource('http://localhost:8080/rest/authors/:authorId', { authorId: '@id' }, { 'update': { method: 'PUT' } });
  }
]);;// Source: build/controllers.js
var bookapp = angular.module('chell-bookapp');
function filterById(array, id) {
  return array.filter(function (object) {
    return object.id === id;
  })[0];
}
bookapp.controller('BookappController', [
  '$scope',
  function BookappCtrl($scope) {
  }
]);
bookapp.controller('BookController', [
  '$scope',
  'Book',
  'Author',
  function ($scope, Book, Author) {
    $scope.currentBook = new Book();
    $scope.currentBook.releaseDate = new Date();
    $scope.books = Book.query();
    $scope.authors = Author.query();
    $scope.showId = false;
    $scope.cancel = function () {
      $scope.currentBook = new Book();
      $scope.currentBook.releaseDate = new Date();
    };
    $scope.save = function () {
      var isNew = $scope.currentBook.id == null;
      if (isNew) {
        $scope.currentBook = Book.save($scope.currentBook);
        $scope.books.push($scope.currentBook);
      } else {
        $scope.currentBook = Book.update($scope.currentBook);
      }
      $scope.cancel();
    };
    $scope.edit = function (book) {
      $scope.currentBook = book;
      $scope.currentBook.author = filterById($scope.authors, book.author.id);
    };
    $scope.remove = function (index, id) {
      $scope.books.splice(index, 1);
      Book.remove({ bookId: id });
    };
  }
]);
bookapp.controller('AuthorController', [
  '$scope',
  'Author',
  function ($scope, Author) {
    $scope.currntAuthor = new Author();
    $scope.authors = Author.query();
    $scope.showId = false;
    $scope.cancel = function () {
      $scope.currentAuthor = new Author();
    };
    $scope.save = function () {
      var isNew = $scope.currentAuthor.id == null;
      if (isNew) {
        $scope.currentAuthor = Author.save($scope.currentAuthor);
        $scope.authors.push($scope.currentAuthor);
      } else {
        $scope.currentAuthor = Author.update($scope.currentAuthor);
      }
      $scope.cancel();
    };
    $scope.edit = function (author) {
      $scope.currentAuthor = author;
    };
    $scope.remove = function (index, id) {
      $scope.authors.splice(index, 1);
      Author.remove({ authorId: id });
    };
  }
]);
bookapp.controller('NavController', [
  '$scope',
  '$rootScope',
  '$route',
  function ($scope, $rootScope, $route) {
    $rootScope.route = $route;
  }
]);;// Source: build/templates.js
angular.module('templates-chell-bookapp', ['templates/authors.tpl.html', 'templates/bookapp.tpl.html', 'templates/books.tpl.html']);

angular.module("templates/authors.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/authors.tpl.html",
    "<div ng-controller=\"AuthorController\">\n" +
    "    <form id=\"form\" name=\"form\">\n" +
    "        <fieldset>\n" +
    "            <legend>Current Author</legend>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"firstname\">Firstname</label>\n" +
    "                <input id=\"firstname\" required type=\"text\" ng-model=\"currentAuthor.firstname\" placeholder=\"Enter an author firstname...\" class=\"form-control\"\n" +
    "                       style=\"width: 380px\"/>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"lastname\">Lastname</label>\n" +
    "                <input id=\"lastname\" required type=\"text\" ng-model=\"currentAuthor.lastname\" placeholder=\"Enter an author lastname...\" class=\"form-control\"\n" +
    "                       style=\"width: 380px\"/>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"id\" ng-show=\"showId\">Id</label>\n" +
    "                <input id=\"id\" type=\"text\" disabled=\"disabled\" ng-model=\"currentAuthor.id\" ng-show=\"showId\" class=\"form-control\" style=\"width: 60px\"/>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "        <button id=\"save\" ng-click=\"save()\" ng-disabled=\"form.$invalid\" class=\"btn btn-primary\">Save Author</button>\n" +
    "        <button id=\"cancel\" ng-click=\"cancel()\" class=\"btn\">Cancel</button>\n" +
    "    </form>\n" +
    "\n" +
    "    <form id=\"list\">\n" +
    "        <fieldset>\n" +
    "            <legend>Authors</legend>\n" +
    "            <label for=\"showId\" class=\"checkbox\">\n" +
    "                <input id=\"showId\" type=\"checkbox\" ng-model=\"showId\">Show Id</input>\n" +
    "            </label>\n" +
    "            <table id=\"table\" class=\"table table-striped table-bordered table-condensed\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Firstname</th>\n" +
    "                    <th>Lastname</th>\n" +
    "                    <th ng-show=\"showId\">Id</th>\n" +
    "                    <th colspan=\"2\">Actions</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr ng-repeat=\"author in authors\">\n" +
    "                    <td>{{author.firstname}}</td>\n" +
    "                    <td>{{author.lastname}}</td>\n" +
    "                    <td ng-show=\"showId\">{{author.id}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"edit\" ng-click=\"edit(author)\" class=\"btn btn-xs\">Edit</button>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <button id=\"delete\" ng-click=\"remove($index, author.id)\" class=\"btn btn-xs\">Delete</button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("templates/bookapp.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bookapp.tpl.html",
    "<div class=\"container\">\n" +
    "    <!-- Main hero unit for a primary marketing message or call to action -->\n" +
    "    <div class=\"jumbotron\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-2\">\n" +
    "                <img src=\"assets/books.png\" class=\"img-rounded\" style=\"width: 140px;\">\n" +
    "            </div>\n" +
    "            <div class=\"col-md-8\">\n" +
    "                <h1>BookApp</h1>\n" +
    "\n" +
    "                <p>This is the BFH BookApp example website.</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!--<div ng-view></div>-->\n" +
    "</div>\n" +
    "\n" +
    "<div chell-portlet-container>\n" +
    "    <div class=\"col-md-12 column\" id=\"col1\">\n" +
    "\n" +
    "        <!-- Book Portlet -->\n" +
    "        <chell-portlet title=\"Books\">\n" +
    "            <ng-include src=\"'templates/books.tpl.html'\"></ng-include>\n" +
    "        </chell-portlet>\n" +
    "\n" +
    "        <!-- Author Portlet -->\n" +
    "        <chell-portlet title=\"Authors\" minimized=\"true\">\n" +
    "            <ng-include src=\"'templates/authors.tpl.html'\"></ng-include>\n" +
    "        </chell-portlet>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/books.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/books.tpl.html",
    "<div ng-controller=\"BookController\">\n" +
    "    <form id=\"form\" name=\"form\">\n" +
    "        <fieldset>\n" +
    "            <legend>Current Book</legend>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"title\">Title</label>\n" +
    "                <input id=\"title\" required type=\"text\" ng-model=\"currentBook.title\" placeholder=\"Enter a book title...\" class=\"form-control\"\n" +
    "                       style=\"width: 380px;\"/>\n" +
    "            </div>\n" +
    "            <div class=\" form-group\">\n" +
    "                <label for=\"releaseDate\">Release date</label>\n" +
    "                <input id=\"releaseDate\" type=\"text\" ng-model=\"currentBook.releaseDate\" datepicker-popup=\"dd.MM.yyyy\"\n" +
    "                       class=\"form-control\" style=\"width: 220px;\"/>\n" +
    "            </div>\n" +
    "            <div class=\" form-group\">\n" +
    "                <label for=\"author\">Author</label>\n" +
    "                <select id=\"author\" required ng-model=\"currentBook.author\"\n" +
    "                        ng-options=\"author as (author.firstname + ' ' + author.lastname) for author in authors\" class=\"form-control\" style=\"width: 220px;\">\n" +
    "                    <option value=\"\">-- choose author --</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"id\" ng-show=\"showId\">Id</label>\n" +
    "                <input id=\"id\" type=\"text\" disabled=\"disabled\" ng-model=\"currentBook.id\" ng-show=\"showId\" class=\"form-control\" style=\"width: 60px;\"/>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "        <button id=\"save\" ng-click=\"save()\" ng-disabled=\"form.$invalid\" class=\"btn btn-primary\">Save Book</button>\n" +
    "        <button id=\"cancel\" ng-click=\"cancel()\" class=\"btn\">Cancel</button>\n" +
    "    </form>\n" +
    "\n" +
    "    <form id=\"list\">\n" +
    "        <fieldset>\n" +
    "            <legend>Books</legend>\n" +
    "            <label for=\"showId\" class=\"checkbox\">\n" +
    "                <input id=\"showId\" type=\"checkbox\" ng-model=\"showId\">Show Id</input>\n" +
    "            </label>\n" +
    "            <table id=\"table\" class=\"table table-striped table-bordered table-condensed\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Titel</th>\n" +
    "                    <th>Release Date</th>\n" +
    "                    <th>Author</th>\n" +
    "                    <th ng-show=\"showId\">Id</th>\n" +
    "                    <th colspan=\"2\">Actions</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr ng-repeat=\"book in books\">\n" +
    "                    <td>{{book.title}}</td>\n" +
    "                    <td>{{book.releaseDate | date:'dd.MM.yyyy'}}</td>\n" +
    "                    <td>{{book.author.firstname }} {{book.author.lastname}}</td>\n" +
    "                    <td ng-show=\"showId\">{{book.id}}</td>\n" +
    "                    <td>\n" +
    "                        <button id=\"edit\" ng-click=\"edit(book)\" class=\"btn btn-xs\">Edit</button>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <button id=\"delete\" ng-click=\"remove($index, book.id)\" class=\"btn btn-xs\">Delete</button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "</div>");
}]);
