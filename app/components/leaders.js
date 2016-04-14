angular.module('HeroBoard.Leaders', [])
    .directive('leaders', function () {
        return {
            scope: {},
            controller: function ($scope, stateMaintainer, $rootScope) {
                $scope.data = stateMaintainer.store.data;

                $rootScope.$on('data-updated', function () {
                    $scope.leaders = [];
                    $scope.data = stateMaintainer.store.data;

                    if ($scope.data) {
                        for (var i = 0; i < 3; i++) {
                            $scope.leaders = $scope.leaders.concat($scope.data['results'][i]);
                        }
                    }
                });
            },
            inject: ['$scope', 'stateMaintainer', '$rootScope'],
            templateUrl: 'views/leaders.html'
        }
    });
    