(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjecteurService', ProjecteurService);
	
    ProjecteurService.$inject = [ '$http', '$cookies', '$rootScope', '$timeout'];
    function ProjecteurService($http, $cookies, $rootScope, $timeout) {
        var service = {};
		
		
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
		
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
        
        service.addElement = addElement;
		service.suppElement = suppElement;
		service.populateDB = populateDB;
		
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
			tx.executeSql('DROP TABLE IF EXISTS DEMO');
			tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
			tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
			tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
		}
		
		function errorCB(err) {
			alert("Error processing SQL: "+err.code);
		}
		
		function successCB() {
			alert("success!");
		}
		
		
        

       
    }

    

}) ();