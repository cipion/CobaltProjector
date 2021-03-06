


$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    //$('.modal').modal();
	$('.button-collapse').sideNav({
		menuWidth: 300, // Default is 300
		edge: 'left', // Choose the horizontal origin
		closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true // Choose whether you can drag to open on touch screens
		}
	);
	// START OPEN
	$('.button-collapse').sideNav();
	
    
	
  });
  
  
var app = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

app.config(function($routeProvider){
	$routeProvider
			.when('/home', {
                controller: 'CalculsController',
                templateUrl: 'calculs/calculs.view.html',
                controllerAs: 'vm'
            })
			.when('/calculs', {
                controller: 'CalculsController',
                templateUrl: 'calculs/calculs.view.html',
                controllerAs: 'vm'
            })

            .when('/magasin', {
                controller: 'MagasinController',
                templateUrl: 'magasin/magasin.view.html',
                controllerAs: 'vm'
            })
			
            .otherwise({ 
			redirectTo: '/chargement' 
			
			});
			
			
});


app.run(function($rootScope, $location, $cookies, $http, $route) {
        /* keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/maison', '/piece']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/chargement');
            }
        });*/
		
		if (localStorage.getItem("connexionAuto") != "true")
		{
			$location.path('/home');			
		}
		
		// Wait for device API libraries to load
		//
		
		document.addEventListener("deviceready", onDeviceReady, false);
		
	
		// device APIs are available
		//
		function onDeviceReady() {
			document.addEventListener("resume", function () {
				console.log("appli resume a partir le la page : " + $location.path() );
				localStorage.setItem("path",$location.path());
				$location.path('chargement');
				$route.reload();
			}, false);
			
			
			
			document.addEventListener("backbutton", function () {
		
				if ($location.path() == "/home" )
				{
					$location.path('/chargement');
					$route.reload();
				}
				else if ($location.path() == "/calculs") {
					$location.path('/home');
					$route.reload();
				}
				else if ($location.path() == "/magasin") {
					$location.path('/home');
					$route.reload();
				}
				
				
				
			}, false);
		}
	
		
		
		
		
		
		
		
		
		
});




