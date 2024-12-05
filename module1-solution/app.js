(function () {
  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.message = '';
    $scope.lunchItems = '';
    $scope.checkLunch = function () {
      // var menu = $scope.lunchItems.split(','); // split the menu into an array
      // if (menu.length > 3) {
      //   $scope.message = 'Too much!';
      // } else {
      //   $scope.message = 'Enjoy!';
      // }

      $scope.message = "";
      $scope.messageClass = "";
      $scope.inputClass = "";

      // Check lunch items logic
      $scope.checkLunch = function () {
        if (!$scope.lunchItems || $scope.lunchItems.trim() === "") {
          $scope.message = "Please enter data first";
          $scope.messageClass = "red-text";
          $scope.inputClass = "red-border";
        } else {
          // Split the string by commas and filter out empty items
          var items = $scope.lunchItems.split(',').map(item => item.trim()).filter(item => item !== "");

          if (items.length === 0) {
            $scope.message = "Please enter data first";
            $scope.messageClass = "red-text";
            $scope.inputClass = "red-border";
          } else if (items.length <= 3) {
            $scope.message = "Enjoy!";
            $scope.messageClass = "green-text";
            $scope.inputClass = "green-border";
          } else {
            $scope.message = "Too much!";
            $scope.messageClass = "green-text";
            $scope.inputClass = "green-border";
          }
        }
      }
    }
  }
})()