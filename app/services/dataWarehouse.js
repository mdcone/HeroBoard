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
