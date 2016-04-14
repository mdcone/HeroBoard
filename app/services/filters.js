angular.module('HeroBoard.Filters', [])
    .filter('ordinal', function () {
        return function (number) {
            var retVal;
            var lastDigit;

            if (isNaN(number) || number < 1) {
                retVal = number;
            } else {
                lastDigit = number % 10;
                if (lastDigit === 1) {
                    retVal = number + 'st';
                } else if (lastDigit === 2) {
                    retVal = number + 'nd';
                } else if (lastDigit === 3) {
                    retVal = number + 'rd';
                } else if (lastDigit > 3 || lastDigit === 0) {
                    retVal = number + 'th';
                }
            }
            return retVal;
        }
    })
    .filter('testformatter', function () {
        return function (testResult, type) {
            var retVal;
            var lookup = {};
            lookup[1] = 'lbs';
            lookup[2] = 'reps';
            lookup[3] = 'rounds';
            lookup[4] = 'time';
            lookup[5] = 'yards';
            lookup[6] = 'meters';
            lookup[7] = 'feet';
            lookup[8] = 'calories';

            retVal = parseInt(testResult, 10) + ' ' + lookup[type];
            if (testResult.indexOf('RX') === -1) {
                retVal += ' with mods'
            }

            return retVal;
        }
    });