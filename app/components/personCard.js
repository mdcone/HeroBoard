// A rendering of a person with their picture and name.
angular.module('HeroBoard.PersonCard', [])
    .directive('personCard', function () {
        return {
            restrict: 'E',
            scope: {
                person: '='
            },
            templateUrl: 'views/personCard.html'
        }
    });
