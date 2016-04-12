angular.module('HeroBoard.Board', [])
    .directive('boardLayout', function () {
        return {
            templateUrl: 'views/board.html'
        }
    })
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
    })
    .directive('stats', function () {
        return {
            scope: {},
            controller: function ($scope, stateMaintainer, $rootScope) {
                $scope.data = stateMaintainer.store.data;
                $scope.totalReps = '...';
                $scope.averageReps = '...';

                $rootScope.$on('data-updated', function () {
                    var totalAccum = 0;
                    var averageAccum = 0;
                    $scope.followers = [];
                    $scope.data = stateMaintainer.store.data;
                    
                    if ($scope.data) {
                        $scope.testResults = $scope.data.results;
                    }

                    if ($scope.testResults) {
                        for (var i = 0; i < $scope.testResults.length; i++) {
                            totalAccum += parseInt($scope.testResults[i].tests[0], 10);
                        }
                        averageAccum = totalAccum / $scope.testResults.length;
                    }
                    
                    $scope.totalReps = totalAccum;
                    $scope.averageReps = Math.round(averageAccum);
                    $scope.units = $scope.data.tests[0].unit;
                });
            },
            inject: ['$scope', 'stateMaintainer', '$rootScope'],
            templateUrl: 'views/stats.html'
        }
    })
    .directive('followers', function () {
        return {
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
    })
;