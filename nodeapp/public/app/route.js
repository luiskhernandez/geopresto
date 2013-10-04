var route = function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: '/app/views/index.html',
		controller: 'IndexCtrl'
	})
	
	.otherwise({ redirectTo: '/' })
};