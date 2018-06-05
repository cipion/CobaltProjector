(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjecteurService', ProjecteurService);
	
    ProjecteurService.$inject = [ '$http', '$cookies', '$rootScope', '$timeout'];
    function ProjecteurService($http, $cookies, $rootScope, $timeout) {
        var service = {};
		var db;
		
		service.elements = [
 				{
 					"id":"test",
 					"nom":"test"			
 				},
 				{
 					"id":"test1",
 					"nom":"test1"			
 				},
 				{
 					"id":"test2",
 					"nom":"test2"			
 				}
 			
 			]
			
			
		service.openDatabase = openDatabase;
        service.addElement = addElement;
		service.suppElement = suppElement;
		service.populateDB = populateDB;
		service.showDocCount = showDocCount;
		
		
		
        
		
        return service;

        
		function addElement(element)
		{
			service.elements.push(element);
		
		}
		
		function suppElement(indexElement)
		{
			service.elements.splice(indexElement, 1);
		}
		
		
		function openDatabase()
		{
			db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
			db.transaction(populateDB, errorCB, successCB);
			showDocCount(db);
		}
		
		function populateDB(tx) {
			tx.executeSql('DROP TABLE IF EXISTS DEMO');
			tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, nom)');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (1, "test1")');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (2, "test2")');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (3, "test3")');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (4, "test4")');
		}
		
		function errorCB(err) {
			console.log("Erreur de creation de la table code : "+err.code);
		}
		
		function successCB() {
			console.log("Succes de creation de la table");
		}
		
		function showDocCount(db) {
		db.readTransaction(function (t) {
			t.executeSql('SELECT * FROM DEMO', [], function (t, r) {
				var i;
				for (i = 0; i < r.rows.length; i++)
				{
					addElement(r.rows[i]);
					
				}
					
				
			
			}, function (t, e) {
			// couldn't read database
			console.log('erreur ' + e.message );
			});
		});
}
        

       
    }

    

}) ();