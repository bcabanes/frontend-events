angular.module("app").config(["$interpolateProvider", function ($interpolateProvider) {
    $interpolateProvider.startSymbol("[[");
    $interpolateProvider.endSymbol("]]");
}]);
