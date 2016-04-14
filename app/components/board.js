angular.module('HeroBoard.Board', [])
    .directive('boardLayout', function () {
        return {
            templateUrl: 'views/board.html'
        }
    })
    .directive('workoutDate', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: function ($scope, stateMaintainer, $rootScope) {
                $scope.date = stateMaintainer.store.data;

                $rootScope.$on('data-updated', function () {
                    $scope.date = stateMaintainer.store.data.date;
                });
            },
            inject: ['$scope', 'stateMaintainer', '$rootScope'],
            template: '{{date | date}}'
        }
    });