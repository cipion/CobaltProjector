(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalculsController', CalculsController);

    CalculsController.$inject = ['$location', '$cookies', '$scope', '$uibModal', '$route'];
    function CalculsController($location, $cookies, $scope, $uibModal, $route) {
         var vm = this;
		
		var data = {};
		vm.ajouterProjecteur = ajouterProjecteur;
		vm.suprimerProjecteur = suprimerProjecteur;
			
            $scope.elements = { "0": {
				"id":"test",
				"nom":"test"			
			},
			"1": {
				"id":"test1",
				"nom":"test1"			
			},
			"2": {
				"id":"test1",
				"nom":"test1"			
			}
			
			}
		
		
		
			
			
			
			
		/*******************************************************************
								DIALOG
		*******************************************************************/
			
		var dialogajouterProjecteur = {
			templateUrl: 'dialog/ajouterProjecteur.dialog.html', // Url du template HTML
			backdrop: true,
			keyboard: true,
			animation: true,			
			controller: ['$scope', '$uibModalInstance', 'PieceService',
				function($scope, $uibModalInstance, PieceService) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
					$scope.ajouter = function() {
						//On fait appel à la fonction du scope parent qui permet de supprimer l'élément.
						//On peut également faire appel à un service de notre application.
						
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
			
			
		var dialogsuprimerProjecteur = {
			templateUrl: 'dialog/suprimerProjecteur.dialog.html', // Url du template HTML
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
				
		
		

		function ajouterProjecteur() {
			console.log('ajout');
			//Ouverture de la fenêtre
		$uibModal.open(dialogajouterProjecteur);
			
		};
		
		function suprimerProjecteur() {
			console.log('suppression');
			//Ouverture de la fenêtre
		var instanceModalSupprimer = $uibModal.open(dialogsuprimerProjecteur);
		
		
		instanceModalSupprimer.result.then(function (pieceSupprimee) {
			$scope.pieceSupprimee = 'La piece "' + pieceSupprimee.nom + '" a ete supprimee';
				}, function () {
			$log.info('Modal dismissed at: ' + new Date());
			});
		};
		
		
		
		
		
		
    }

}) ();






