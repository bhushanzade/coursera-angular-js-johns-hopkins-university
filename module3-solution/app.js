(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiPath', "https://coursera-jhu-default-rtdb.firebaseio.com")
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    const ctrl = this;
    ctrl.searchTerm = "";
    ctrl.isEmpty = false;
    ctrl.isLoading = false;
    ctrl.found = [];

    ctrl.getItems = function () {
      if (ctrl.searchTerm) {
        ctrl.isLoading = true;
        const promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
        promise.then(function (result) {
          ctrl.isLoading = false;
          ctrl.isEmpty = false;
          ctrl.found = result;
          if (result && result.length === 0) {
            ctrl.isEmpty = true;
          }
        }).catch(function (error) {
          ctrl.isLoading = false;
          console.log("Error fetching menu items:", error);
        });
      } else {
        ctrl.isEmpty = true;
        ctrl.found = [];
      }
    };

    ctrl.removeItem = function (index) {
      ctrl.found.splice(index, 1);
    };
  };

  MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    const service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json")
      }).then(function (result) {
        const foundItems = [];
        const categories = result.data;
        for (let category in categories) {
          if (categories.hasOwnProperty(category)) {
            const menuItems = categories[category].menu_items;
            for (let i = 0; i < menuItems.length; i++) {
              const item = menuItems[i];
              if (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                foundItems.push(item);
              }
            }
          }
        }
        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
  }
})();
