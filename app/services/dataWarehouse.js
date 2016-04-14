// Provides two services, one which will return a promise that is associated to
// an http request to hit our data endpoint. The second one acts as a store
// of data which emits an event on the rootScope when an item stored inside of
// it changes. This allows for listeners to listen for changes to the data
// that they care about.
var appURL = 'https://apis.trainheroic.com';

angular.module('HeroBoard.dataWarehouse', [])
    .service('dataGrabber', ['$http', '$q', function ($http, $q) {

        return {
            resourceGet: function (resource) {
                var promise = $http.get(appURL + resource);
                var deferrable = $q.defer();

                promise.then(
                    function (data) {
                        deferrable.resolve(data);
                    },
                    function (error) {
                        deferrable.reject(error);
                    }
                );

                return deferrable.promise;
            }
        }
    }])
    .service('stateMaintainer', ['$rootScope', function ($rootScope) {
        return {
            store: {},
            setItem: function (item, value) {
                this.store = angular.copy(this.store);
                this.store[item] = value;
                $rootScope.$emit(item + '-updated');
            }
        }
    }]);
