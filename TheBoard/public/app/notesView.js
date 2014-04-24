(function(angular) {
    var theModule = angular.module("notesView", []);

    theModule.controller("notesViewController",
        ['$scope', '$window', '$http', 
            function ($scope, $window, $http) {
                
                var urlParts = $window.location.pathname.split("/");
                var categoryName = urlParts[urlParts.length - 1];
                var notesUrl = '/api/notes/' + categoryName;

                $scope.notes = [];

                $http.get(notesUrl).then(function(result) {
                    $scope.notes = result.data;
                }, function(err) {
                    
                });

            }
        ]);
})(window.angular)