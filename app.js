(function () {
  angular.module('myApp', []).controller('myCtrl', function ($scope) {
    $scope.name = 'Hello Coursera';
  });

  angular.module('NameCalculator', []).controller('NameCalculatorCtrl', function ($scope) {
    $scope.name = '';
    $scope.totalVal = 0;

    $scope.displayNumericValue = function () {
      var total = 0;
      for (var i = 0; i < $scope.name.length; i++) {
        total += $scope.name.charCodeAt(i);
      }
      $scope.totalVal = total;
    }

  });

  angular.module('MsgApp', []).controller('MsgCtrl', MsgCtrl);

  MsgCtrl.$inject = ['$scope'];

  function MsgCtrl($scope) {
    $scope.message = 'Hello Coursera';
  }
})()