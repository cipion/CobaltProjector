(function () {
    'use strict';
	 
	 
    angular
        .module('app')
        .controller('ChargementController', ChargementController);

    ChargementController.$inject = ['$location', '$cookies', 'AuthenticationService', '$scope', '$routeParams'];
    function ChargementController($location, $cookies, AuthenticationService, $scope, $routeParams) {
        var vm = this;
		$scope.user = {};
		var data = {};
		console.log($routeParams);
		var statut = $routeParams;
		
		
		
        

        (function initController() {
            // reset login status
			
			
			$scope.user.id = localStorage.getItem("login");
			$scope.user.mdp = localStorage.getItem("mdp");
			
			console.log('Page attente connexion auto');
			
            vm.dataLoading = true;
			
			
            AuthenticationService.Login($scope.user, function (response) {
				 
               if (response.status === 200)
			   {
					 
					 
					 //console.log('data = ' + response.data.listeMaisons[0].nom);
					 
					 
					 if ($.isEmptyObject(response.data.listeMaisons) )
						 {
							 
							 console.log('Objet vide');
							 $scope.erreurLogin = 'Erreur de login';
							 
						 }
						 else
						 {
							localStorage.setItem("login",$scope.user.id);
							localStorage.setItem("mdp",$scope.user.mdp);
							
							data = response.data;
							 console.log('Objet existant');
							 $scope.erreurLogin = '';
							 $cookies.putObject('maisons', response.data.listeMaisons);
							 console.log("JSESSIONID : " + $cookies.get('JSESSIONID'));
							 console.log("Rechargement de la page " + localStorage.getItem("path"));
							 if (localStorage.getItem("path") == null)
							 {
							 	$location.path("/login");
							 }
							 else
							 {
								$location.path(localStorage.getItem("path"));
							 }
							 
							 
							 //$location.path("home");
							 console.log("Page actuelle " +$location.path());
							 //TODO : appliquer le changement de vue
						 }
					 
					 
					 
					
			   }
			  
			   else
			   {
				   $scope.erreurLogin = 'Erreur technique';
				   localStorage.setItem("connexionAuto", false);
				   $scope.connexionAuto = false;
				   $location.path('login');
			   }
			   
				   
            });
			
			
			
			
			
			
			
            
        })();

        
		
    }

}) ();
