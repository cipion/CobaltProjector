(function () {
    'use strict';

    angular
        .module('app')
        .controller('MagasinController', MagasinController);

    MagasinController.$inject = ['$location', '$cookies', '$scope', '$uibModal', '$route', 'ProjecteurService'];
    function MagasinController($location, $cookies, $scope, $uibModal, $route, ProjecteurService) {
         var vm = this;
		 var idElement;
		
		vm.ajouterProjecteur = ajouterProjecteur;
		vm.suprimerProjecteur = suprimerProjecteur;
		vm.infoElement = infoElement;
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
			controller: ['$scope', '$uibModalInstance', 'ProjecteurService',
				function($scope, $uibModalInstance, ProjecteurService) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
					$('select').formSelect();
					$scope.tensions = ProjecteurService.tensions;
					$scope.phases = ProjecteurService.phases;
					
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
				
			},
			scope: $scope
			};
			
			
			var dialogInfoProjecteur= {
			templateUrl: 'dialog/infoProjecteur.dialog.html', // Url du template HTML
			backdrop: true,
			keyboard: true,
			animation: true,			
			controller: ['$scope', '$uibModalInstance', 'ProjecteurService',
				function($scope, $uibModalInstance, ProjecteurService) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
					//Partage de donnees
					var infoElement;
					
					ProjecteurService.getInfoElement(idElement, function (result) {
						$scope.nomProjecteur = result.nom;
						$scope.tensionProjecteur = result.tension;
						$scope.puissanceProjecteur = result.puissance;
						$scope.courantProjecteur = result.courant;
						$scope.phaseProjecteur = result.phase;
						
					});
					
					
					
					$scope.cancel = function() {
						// Appel à la fonction d'annulation.
						$uibModalInstance.dismiss('cancel');
					};
				}
			],
			resolve: {
				
			},
			scope: $scope
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
		
		function infoElement(id)
		{
			idElement = id;
			console.log('info element id :' + idElement);
			//Ouverture de la fenêtre
			$uibModal.open(dialogInfoProjecteur);
		}
		
		
    }

}) ();






