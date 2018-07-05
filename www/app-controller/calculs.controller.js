(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalculsController', CalculsController);

    CalculsController.$inject = ['$location', '$cookies', '$scope', '$uibModal', '$route', 'ProjecteurService'];
    function CalculsController($location, $cookies, $scope, $uibModal, $route, ProjecteurService) {
         var vm = this;
		
		vm.data.tensions = ["tension du Projecteur",230,380];
		vm.data.phases = ["monophasé","triphasé"]
		vm.ajouterProjecteur = ajouterProjecteur;
		vm.suprimerProjecteur = suprimerProjecteur;
		vm.refresh = refresh;
		vm.initList = initList;
		
		
		initList();
		// refresh();
			
			
			
			
		/*******************************************************************
								DIALOG
		*******************************************************************/
			
		var dialogajouterProjecteur = {
			templateUrl: 'dialog/ajouterProjecteur.dialog.html', // Url du template HTML
			backdrop: true,
			keyboard: true,
			animation: true,			
			controller: ['$scope', '$uibModalInstance', 'ProjecteurService', 'vm',
				function($scope, $uibModalInstance, ProjecteurService, vm) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
					$scope.ajouter = function() {
						//On fait appel à la fonction du scope parent qui permet de supprimer l'élément.
						//On peut également faire appel à un service de notre application.
						var element = {"nom":$scope.nomProjecteur, "tension":$scope.tensionProjecteur, "courant":$scope.courantProjecteur, "phase":$scope.phaseProjecteur, "puissance":$scope.puissanceProjecteur};
						ProjecteurService.addElement(element, function(){
							refresh();
							$uibModalInstance.close();
						
						});
						//Fermeture de la fenêtre modale
						
						
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
			
			
			
		
		/*******************************************************************
								Function
		*******************************************************************/
		
		// apres clic sur une piece, recuperation de la liste des commandes de la piece puis affichage des commandes
				
		
		

		function ajouterProjecteur() {
			console.log('ajout');
			//Ouverture de la fenêtre
			$uibModal.open(dialogajouterProjecteur);
			
			
			
		};
		
		function suprimerProjecteur(index, id) {
			console.log('suppression');
			//Ouverture de la fenêtre
			
			// delete elements[objectDelete];
			
			ProjecteurService.suppElement(index, id, function(){
				refresh();
			});
			
		};
		
		
		function refresh ()
		{
			$scope.elements = angular.copy(ProjecteurService.elements);
			console.log($scope.elements);
			$scope.$apply();
		}
		
		
		function initList ()
		{
			ProjecteurService.openDatabase(refresh);
			
		}
		
		
		
		
    }

}) ();






