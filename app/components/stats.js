

angular.module('HeroBoard.Stats', [])
    .directive('stats', function () {
        return {
            scope: {},
            controller: function ($scope, stateMaintainer, $rootScope) {
                $scope.data = stateMaintainer.store.data;
                $scope.totalReps = '...';
                $scope.averageReps = '...';
                $scope.asPerscribed = '...';

                $rootScope.$on('data-updated', function () {
                    var totalAccum = 0;
                    var averageAccum = 0;
                    var completedAccum = 0;
                    var asPerscribed = 0;
                    var numTests = 0;
                    var result;

                    $scope.followers = [];
                    $scope.data = stateMaintainer.store.data;

                    if ($scope.data && $scope.data.results) {
                        $scope.test = $scope.data.tests[0];
                        $scope.testResults = $scope.data.results;
                        numTests = $scope.testResults.length;
                    }

                    if ($scope.testResults) {
                        for (var i = 0; i < numTests; i++) {
                            totalAccum += parseInt($scope.testResults[i].tests[0], 10);
                            result = $scope.testResults[i].tests[0];
                            if (result.indexOf('RX') !== -1) {
                                asPerscribed++;
                                if (parseInt(result, 10) > 0) {
                                    completedAccum++;
                                }
                            }

                        }
                        averageAccum = totalAccum / $scope.testResults.length;


                    }

                    $scope.asPerscribed = parseInt((asPerscribed / numTests) * 100, 10);
                    $scope.totalReps = totalAccum;
                    $scope.averageReps = Math.round(averageAccum);
                    $scope.completed = parseInt((completedAccum / numTests) * 100, 10);
                    $scope.units = $scope.data.tests[0].unit;
                });
            },
            inject: ['$scope', 'stateMaintainer', '$rootScope'],
            templateUrl: 'views/stats.html'
        }
    });
