(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjecteurService', ProjecteurService);
	
    ProjecteurService.$inject = [ '$http', '$cookies', '$rootScope', '$timeout'];
    function ProjecteurService($http, $cookies, $rootScope, $timeout) {
        var service = {};
		
		
				
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
        service.elements = angular.copy(showDocCount(db));
		
		
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
		
		
		
		function populateDB(tx) {
			//tx.executeSql('DROP TABLE IF EXISTS DEMO');
			tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, nom)');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (1, "test1")');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (2, "test2")');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (3, "test3")');
			tx.executeSql('INSERT INTO DEMO (id, nom) VALUES (4, "test4")');
		}
		
		function errorCB(err) {
			alert("Error processing SQL: "+err.code);
		}
		
		function successCB() {
			alert("success!");
		}
		
		function showDocCount(db) {
		db.readTransaction(function (t) {
			t.executeSql('SELECT * FROM DEMO', [], function (t, r) {
			return r.rows;
			}, function (t, e) {
			// couldn't read database
			console.log('erreur ' + e.message );
			});
		});
}
        

       
    }

    

}) ();