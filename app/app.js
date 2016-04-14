'use strict';

angular.module('HeroBoard', 
    ['ngMaterial', 
        'HeroBoard.Board', 
        'HeroBoard.Stats', 
        'HeroBoard.Leaders', 
        'HeroBoard.Followers', 
        'HeroBoard.Scroller', 
        'HeroBoard.PersonCard', 
        'HeroBoard.Filters', 
        'HeroBoard.dataWarehouse'])
    .controller('HeroBoardCtrl', ['$scope', 'dataGrabber', 'stateMaintainer', '$interval',
        function ($scope, dataGrabber, stateMaintainer, $interval) {
            var request = dataGrabber.resourceGet('/public/leaderboard/468425');
            var lastTimeStamp;

            var getUpdate = function () {
                request.then(function (data) {
                    if (data.data.timestamp !== lastTimeStamp) {
                        lastTimeStamp = data.data.timestamp;
                        stateMaintainer.setItem('data', data.data);
                    }
                }, function (error) {
                    // oh noes!
                });
            };

            getUpdate();

            // Get new data every 10 minutes...
            $interval(getUpdate, 10 * 60 * 1000);
        }]);
