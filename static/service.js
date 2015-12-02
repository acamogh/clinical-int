
sampleApp.factory('myData', ['$http', function($http) {
  return {
    get: function() {
      return $http.get('call_queue.json').then(function(response) {
        return response.data;
      });
    }
  };
}]);



