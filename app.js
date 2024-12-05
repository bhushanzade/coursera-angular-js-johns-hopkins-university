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

  angular.module('MsgApp', []).controller('MsgCtrl', MsgCtrl)
    .filter('replaceword', ReplaceFilter);

  MsgCtrl.$inject = ['$scope'];

  function MsgCtrl($scope) {
    $scope.message = 'Hello Coursera';
    $scope.value = .23;
    // const message = replacewordFilter("Hello Coursera plus", "plus", "Pro");
    // $scope.message2 = message;

    var student1 = {
      message: "I LOVE this course!"
    };

    var student2 = Object.create(student1);
    student2.getMessage = function () {
      this.message = "Student 1 was paid off by Yaakov to say that!";
      return this.message;
    };
    var coverUp = student2.getMessage();
    console.log(student2.message);

    function Person(name) {
      this.name = name;
      console.log("this.name", this.name);

    }

    var p = new Person("Yaakov");

  }

  function ReplaceFilter() {
    return function (input, target, replace) {
      input = input || "";
      input = input.replace(target, replace);
      return input;
    }
  }
})()