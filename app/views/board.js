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
    })
    .directive('personCard', function () {
        return {
            restrict: 'E',
            scope: {
                person: '='
            },
            templateUrl: 'views/personCard.html'
        }
    })
    .directive('scroller', function () {
        return {
            restrict: 'E',
            scope: {},
            inject: ['$scope', 'stateMaintainer', '$rootScope', '$timtout'],
            controller: function ($scope, stateMaintainer, $rootScope, $timeout) {
                // This code is taken from the examples on Angular Material's
                // site for their Virtual Repeater
                var DynamicItems = function () {
                    this.loadedPages = {};
                    this.numItems = 0;
                    this.PAGE_SIZE = 25;
                    this.fetchNumItems_();
                };

                // Required.
                DynamicItems.prototype.getItemAtIndex = function (index) {
                    var pageNumber = Math.floor(index / this.PAGE_SIZE);
                    var page = this.loadedPages[pageNumber];
                    if (page) {
                        return page[index % this.PAGE_SIZE];
                    } else if (page !== null) {
                        this.fetchPage_(pageNumber);
                    }
                };
                // Required.
                DynamicItems.prototype.getLength = function () {
                    return this.numItems;
                };
                DynamicItems.prototype.fetchPage_ = function (pageNumber) {
                    // Set the page to null so we know it is already being fetched.
                    this.loadedPages[pageNumber] = null;
                    var results = stateMaintainer.store.data ? stateMaintainer.store.data.results : [];
                    // For demo purposes, we simulate loading more items with a timed
                    // promise. In real code, this function would likely contain an
                    // $http request.
                    $timeout(angular.noop, 300).then(angular.bind(this, function () {
                        this.loadedPages[pageNumber] = [];
                        var pageOffset = pageNumber * this.PAGE_SIZE;
                        for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
                            console.log('Loading ' + i + 'at results: ' + JSON.stringify(results[i]))
                            this.loadedPages[pageNumber].push(results[i]);
                        }
                    }));
                };
                DynamicItems.prototype.fetchNumItems_ = function () {
                    var results = stateMaintainer.store.data;
                    this.numItems = (results) ? results.results.length : 0;
                };
                
                $rootScope.$on('data-updated', function () {
                    $scope.dynamicItems = new DynamicItems();
                });

                $scope.dynamicItems = new DynamicItems();
            },
            templateUrl: 'views/scroller.html'
        }
    });