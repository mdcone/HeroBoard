'use strict';

angular.module('HeroBoard', ['ngMaterial', 'HeroBoard.Board', 'HeroBoard.dataWarehouse'])
    .controller('HeroBoardCtrl', ['$scope', 'dataGrabber', 'stateMaintainer',
        function ($scope, dataGrabber, stateMaintainer) {
            var request = dataGrabber.resourceGet('/public/leaderboard/468425');
            request.then(function (data) {
                console.log(data.data);

                
                stateMaintainer.setItem('data', data.data);

            }, function (error) {
                // oh noes!
            });
            $scope.message = 'hello';
        }]);
