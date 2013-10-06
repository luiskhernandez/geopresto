app
.controller
('IndexCtrl',
 ['$scope','Places',
  function ($scope,Places) {
	
	
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
	$scope.addPlace = function() {
		var icon_url=""
		if ($scope.markerTemp.infoWindow){

			if($scope.markerTemp.type==0){
				icon_url = "https://si0.twimg.com/profile_images/3400885729/20b552e0241318032b1dacb124ac107d_normal.jpeg"
				}else{
				  icon_url = "http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_Small_Blue_House_(4).png"	
				}

			marker ={
				infoWindow: $scope.markerTemp.infoWindow,
				latitude: $scope.markerTemp.latitude,
				longitude: $scope.markerTemp.longitude,
				
				icon: icon_url
			}
			
			//$scope.markers.pop()
			Places.create(marker).then(function(data) {
				$scope.getAll()
			})

			$scope.markerTemp={}
			$scope.markerTemp.type = 1;
		}
	};

	$scope.near = function() {
		obj={
			item:$scope.place,	
			radius:$scope.radius	
		}
		Places.near(obj).then(function(data) {
			
			$scope.markers = data	
		})
	};

	$scope.showAll = function() {
		$scope.getAll()
	};
	$scope.getAll = function() {
		Places.getList().then(function(data) {
			
			$scope.markers = data
			$scope.markers_list = data
			$scope.place = $scope.markers_list[0]
		})
	};
	$scope.getAll()
	
}]);

app.factory('Places', ['$http', function ($http) {

var url_places = "/places";

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
	
	Places.near=function(item){

		return $http.post(url_places+"/near",item).then(
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

    

    return Places;
}])