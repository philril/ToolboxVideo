ourApp.controller("MainController", ['$scope', '$http', '$route','$cookies', function($scope, $http, $route, $cookies){

    console.log("COOKIE: "+$cookies.user_id)

    $scope.loggedInUser = $cookies.user_id
    $scope.bgImg
// set this http get to user:

// Get current user
    $http.get("http://nomadr-api.herokuapp.com/api/users/"+$scope.loggedInUser).success(function(response){

// Trying to turn city into query string so I can plug it into URL!!!! (can I use JQUERY here?)
        $scope.currentUser = response

        // FIXME: put this on the back end!
        //Get Weather
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.currentUser.city).success(function(response){
            $scope.weather = response
        })

        //Get photo
        $http.get('http://nomadr-api.herokuapp.com/api/google_photo/'+$scope.loggedInUser).success(function(response){
            var maxNum = response.photos.length
            var randNum = (Math.floor(Math.random()*(maxNum - 0) + 0))
            $scope.bgImg = response.photos[randNum]
            console.log("we're in the photo now")
            debugger
        })

        // FIXME: city names with a space break this
        // Get Wiki Info
        $http.get('http://nomadr-api.herokuapp.com/api/wiki/'+$scope.loggedInUser).success(function(response){
            $scope.wiki_data = response.wiki_content
            console.log("hey we're in the wiki thing")
        }).fail(function() {
            console.log("wiki data failed")
        })

    }).error(function(){
        $scope.quote =  "Request Failed!"
    })


    $scope.farenheit = function(kelvin) {
        var num = 1.8 * (kelvin - 273) + 32
        return num.toFixed()
    }


}]);
