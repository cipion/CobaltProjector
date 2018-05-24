(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = [ '$location', '$cookies',  '$scope', 'MaisonService'];
    function HomeController( $location, $cookies,  $scope, MaisonService) {
        var vm = this;
		vm.maison = maison;
		var data = {};
		
				
            
        $scope.maisons = $cookies.getObject('maisons');
		
		
		
		
		// apres clic sur une maison, recuperation de la liste des pieces de la maison puis affichage des pieces
		// appel service pour recuperer la liste des pieces
				
		function maison(){
			
			var id = event.currentTarget.id;
			console.log('recuperation des pieces de la maison id=' + event.currentTarget.id);
			MaisonService.GetListePieces(id, function (response) {
				 
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
							 $cookies.putObject('idMaison', id);
							 $location.path("maison");
							 console.log($location.path());
					 
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
			   
				   
            });
           
        };
    }

}) ();



