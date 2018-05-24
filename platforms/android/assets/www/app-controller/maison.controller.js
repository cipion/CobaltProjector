(function () {
    'use strict';

    angular
        .module('app')
        .controller('MaisonController', MaisonController);

    MaisonController.$inject = ['$location', '$cookies', 'PieceService', '$scope', '$uibModal', 'MaisonService', '$route'];
    function MaisonController($location, $cookies, PieceService, $scope, $uibModal, MaisonService, $route) {
         var vm = this;
		vm.piece = piece;
		var data = {};
		vm.ajouterPiece = ajouterPiece;
		vm.supprimerPiece = supprimerPiece;
			
            
        $scope.pieces = $cookies.getObject('pieces');
		
		
		/*******************************************************************
								Fonction rafraichissement page
		*******************************************************************/
		
		var callBack = function (response) {
				 
                if (response.status === 404)
			   {
					$scope.errorMsg = 'Erreur ' + response.status + ' durant l\'ajout de la piece : probleme de connexion';
			   }
			   else if (response.status === 200)
			   {
					 
					 var id = $cookies.getObject('idMaison');
					 console.log('data = ' + response.data);
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
											$route.reload();
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
					 
					 
					 
					 
					
			   }
			   else if (response.status === 307)
			   {
				   $scope.erreurLogin = 'Erreur d ajout de piece';
			   }
			   
			   else
			   {
				   $scope.erreurLogin = 'Erreur technique';
			   }
			   
				   
            };
			
			
			
			
			
			
		/*******************************************************************
								DIALOG
		*******************************************************************/
			
		var dialogAjouterPiece = {
			templateUrl: 'dialog/ajouterPiece.dialog.html', // Url du template HTML
			backdrop: true,
			keyboard: true,
			animation: true,			
			controller: ['$scope', '$uibModalInstance', 'PieceService',
				function($scope, $uibModalInstance, PieceService) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
					$scope.ajouter = function() {
						//On fait appel à la fonction du scope parent qui permet de supprimer l'élément.
						//On peut également faire appel à un service de notre application.
						PieceService.Ajouter($scope.nomPiece, callBack);
						//Fermeture de la fenêtre modale
						$uibModalInstance.close();
					};
					$scope.cancel = function() {
						// Appel à la fonction d'annulation.
						$uibModalInstance.dismiss('cancel');
					};
				}
			],
			resolve: {
				
			}
			};
			
			
		var dialogSupprimerPiece = {
			templateUrl: 'dialog/supprimerPiece.dialog.html', // Url du template HTML
			backdrop: true,
			keyboard: true,
			animation: false,			
			controller: ['$scope', '$uibModalInstance', 'PieceService', 
				function($scope, $uibModalInstance, PieceService) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
					 var $ctrl = this;
					$scope.pieces = $cookies.getObject('pieces');
					
					$ctrl.selected = {};
					
					$scope.supprimer = function() {
						//On fait appel à la fonction du scope parent qui permet de supprimer l'élément.
						//On peut également faire appel à un service de notre application.
						PieceService.Supprimer($ctrl.selected.piece.id_piece, callBack);
						//Fermeture de la fenêtre modale
						$uibModalInstance.close($ctrl.selected.piece);
					};
					$scope.cancel = function() {
						// Appel à la fonction d'annulation.
						$uibModalInstance.dismiss('cancel');
					};
				}
			],
			controllerAs: '$ctrl',
			resolve: {
				
			}
			};
			

		
		
		
		
		/*******************************************************************
								Function
		*******************************************************************/
		
		// apres clic sur une piece, recuperation de la liste des commandes de la piece puis affichage des commandes
				
		function piece(){
			
			var id = event.currentTarget.id;
			console.log('recuperation des commandes de la piece id=' + event.currentTarget.id);
			PieceService.GetListeCommandes(id, function (response) {
				 
                if (response.status === 404)
			   {
					$scope.errorMsg = 'Erreur ' + response.status + ' durant la recuperation des commandes : probleme de connexion';
			   }
			   else if (response.status === 200)
			   {
					 
					data = response.data;
							 console.log('Objet existant');
							 $scope.errorMsg = '';
							 $cookies.putObject('commandes', response.data.listeCommandes);
							 $cookies.putObject('idPiece', id);
							 $location.path("piece");
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

		

		function ajouterPiece() {
			console.log('ajout');
			//Ouverture de la fenêtre
		$uibModal.open(dialogAjouterPiece);
			
		};
		
		function supprimerPiece() {
			console.log('suppression');
			//Ouverture de la fenêtre
		var instanceModalSupprimer = $uibModal.open(dialogSupprimerPiece);
		
		
		instanceModalSupprimer.result.then(function (pieceSupprimee) {
			$scope.pieceSupprimee = 'La piece "' + pieceSupprimee.nom + '" a ete supprimee';
				}, function () {
			$log.info('Modal dismissed at: ' + new Date());
			});
		};
		
		
		
		
		
		
    }

}) ();






