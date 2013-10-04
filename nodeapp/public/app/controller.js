app
.controller
('IndexCtrl',
 ['$scope',
  function ($scope) {
	
	
	$scope.pintar = false;
	$scope.markerLat = null;
	$scope.markerLng = null;
	$scope.zoom=17; // the zoom level
	 // the zoom level
  	$scope.center= {
		latitude: 10.99420899006712, // initial map center latitude
		longitude: -74.80649047062529 // initial map center longitude
	}
	// an array of markers	
	$scope.markers= [
	{
		latitude: 10.99420899006712,
		longitude: -74.80649047062529,
		infoWindow:"primero",
		icon: "http://s3.amazonaws.com/image.chatsports.com/logo_thumbs/icons/chicago-bulls.png"
	}
	]// obj.latitude, obj.longitude, obj.infoWindow, obj.icon
	$scope.markers_list= []// obj.latitude, obj.longitude, obj.infoWindow, obj.icon
	$scope.add = function() {
		if ($scope.markerTemp.infoWindow){
			marker ={
				infoWindow: $scope.markerTemp.infoWindow,
				latitude: $scope.markerTemp.latitude,
				longitude: $scope.markerTemp.longitude,
				icon: "http://s3.amazonaws.com/image.chatsports.com/logo_thumbs/icons/chicago-bulls.png"
			}
			
			//$scope.markers.pop()
			$scope.markers.push(marker);
			//$scope.markerTemp={}
			
			

			
		}
	};
}]);

app.factory('Countries', ['$http', function ($http) {

var url_places = "/places/";

	var Places = function(data){
		angular.extend(this, data);
	}

	Places.getList=function(){

		return $http.get(url_places).then(
			function(response){
				return response.data;
			}
			, 
			function(response){
				console.log(response);
			})
	}
	
				
	Places.create = function(item) {
        return $http.post(url_places, item).success(function(response) {
            return response.data;
        }).error(function(data){
            console.log(data);
        });
    };

    

    return Countries;
}])