(function () {
    'use strict';

    angular
        .module('app')
        .factory('CallbackService', CallbackService);
	
    CallbackService.$inject = [ '$location', '$cookies', '$rootScope'];
    function CallbackService( $location, $cookies, $rootScope ) {
        var service = {};
		var data = {};
		
        service.CallMaison = CallMaison;
		
        
        return service;

        
		
		function CallMaison (response) {
				 
                if (response.status === 404)
			   {
					$scope.errorMsg = 'Erreur ' + response.status + ' durant la recuperation des pieces : probleme de connexion';
			   }
			   else if (response.status === 200)
			   {
					 
					 
					 
					 data = response.data;
							 console.log('Objet existant');
							 $scope.errorMsg = '';
							 $cookies.putObject('pieces', response.data.listePieces); 
							 $location.path("maison");
							 console.log($location.path());
					 /*
					 if ($.isEmptyObject(response.data.listePieces) )
						 {
							 
							 console.log('Objet vide');
							 $scope.errorMsg = 'Pas de piece pour cette maison';
							 
						 }
						 else
						 {
							data = response.data;
							 console.log('Objet existant');
							 $scope.errorMsg = '';
							 $cookies.putObject('pieces', response.data.listePieces); 
							 $location.path("maison");
							 console.log($location.path());
							 
						 }*/
					 
					 
					 
					
			   }
			   else if (response.status === 400)
			   {
				   //$location.path("login");
				   $scope.errorMsg = 'Erreur technique';
			   }
			   else if (response.status === 307)
			   {
				   $scope.errorMsg = 'Erreur de  parametre';
			   }
			   else
			   {
				   $scope.errorMsg = 'Erreur technique';
			   }
			   
				   
            }
       
    }


}) ();