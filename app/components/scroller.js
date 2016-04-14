// A scrolling display of records.
angular.module('HeroBoard.Scroller', [])
    .directive('scroller', function () {
        return {
            restrict: 'E',
            scope: {},
            inject: ['$scope', 'stateMaintainer', '$rootScope', '$timtout', '$interval'],
            controller: function ($scope, stateMaintainer, $rootScope, $timeout, $interval) {
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
                    $scope.testType = stateMaintainer.store.data.tests[0].testType;
                });

                $scope.dynamicItems = new DynamicItems();

                
                // Here's the scrolling animation logic. When we reach the bottom
                // the code jumps back up and starts over.
                var offset = 0;
                var card = 0;
                var animationCallback = angular.bind(this, function () {
                    var userCard = $('#userCard' + (card += 3));

                    if (userCard.offset()) {
                        offset += userCard.offset().top;
                        $('.md-virtual-repeat-scroller').animate({
                            scrollTop: offset
                        }, 1000, 'swing', function () {
                            $timeout(animationCallback, 1500);
                        });
                    } else {
                        card = 0;
                        offset = 0;
                        $('.md-virtual-repeat-scroller').animate({
                            scrollTop: 0
                        }, 1000, 'swing', function () {
                            $timeout(animationCallback, 1500);
                        });
                    }
                });
                $timeout(animationCallback, 1000);
            },
            templateUrl: 'views/scroller.html'
        }
    });