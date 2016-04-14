angular.module('HeroBoard.Followers', [])
    .directive('followers', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: function ($scope, stateMaintainer, $rootScope) {
                $scope.data = stateMaintainer.store.data;

                $rootScope.$on('data-updated', function () {
                    $scope.followers = [];
                    $scope.data = stateMaintainer.store.data;
                    if ($scope.data) {
                        $scope.testResults = $scope.data.results;
                    }

                    if ($scope.testResults) {
                        for (var i = $scope.testResults.length - 3; i < $scope.testResults.length; i++) {
                            $scope.followers = $scope.followers.concat($scope.testResults[i]);
                        }
                    }
                });
            },
            inject: ['$scope', 'stateMaintainer', '$rootScope'],
            templateUrl: 'views/followers.html'
        }
    });