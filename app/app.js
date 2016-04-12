'use strict';

angular.module('HeroBoard', ['ngMaterial', 'HeroBoard.Board'])
    .controller('HeroBoardCtrl', ['$scope', function ($scope) {
        $scope.message = 'hello';
    }]);
