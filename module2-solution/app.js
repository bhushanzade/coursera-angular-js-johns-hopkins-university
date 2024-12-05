(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		const toBuyCtrl = this;
		toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();
		toBuyCtrl.buyItem = function (item) {
			ShoppingListCheckOffService.buyItem(item);
		};
		toBuyCtrl.isEmpty = function () {
			return ShoppingListCheckOffService.emptyBuy();
		}
	}


	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		const boughtCtrl = this;
		boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
		boughtCtrl.isEmpty = function () {
			return ShoppingListCheckOffService.emptyBought();
		}
	}


	function ShoppingListCheckOffService() {
		const service = this;
		const toBuyItems = [
			{ name: "Cookies", quantity: 10 },
			{ name: "Chips", quantity: 5 },
			{ name: "Soda", quantity: 3 },
			{ name: "Bread", quantity: 2 },
			{ name: "Milk", quantity: 1 }
		];

		const boughtItems = [];

		service.getToBuyItems = function () {
			return toBuyItems;
		};

		service.getBoughtItems = function () {
			return boughtItems;
		};

		service.buyItem = function (item) {
			var index = toBuyItems.indexOf(item);
			if (index !== -1) {
				toBuyItems.splice(index, 1);
				boughtItems.push(item);
			}
		};

		service.emptyBuy = function () {
			if (toBuyItems.length === 0) {
				return true;
			}
			else return false;
		}

		service.emptyBought = function () {
			if (boughtItems.length === 0) {
				return true;
			}
			else return false;
		}
	}

})();
