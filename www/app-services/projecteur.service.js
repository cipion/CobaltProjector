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
		
		
		function openDatabase(resultat)
		{
			if (!('indexedDB' in window)) {
				window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			}
	
			var req = indexedDB.open("demo", 1);

			req.onsuccess = function(e) {
				db = e.target.result;
				db.transaction(populateDB, errorCB, successCB);
				
				showDocCount(db, function() {
					resultat();			
				});
				
			};
			
			
			
			
			
		}
		
		function populateDB(tx) {
		
			var elem = {
               book: book,
               pdf_file: null
             }
			 
			db.transaction("demo", "readwrite").objectStore("demo").put(elem, book[3]);
			
			
			
		}
		
		function errorCB(err) {
			console.log("Erreur de creation de la table code : "+err.code);
		}
		
		function successCB() {
			console.log("Succes de creation de la table");
		}
		
		function showDocCount(db, callback) {
		db.readTransaction(function (t) {
			t.executeSql('SELECT * FROM DEMO', [], function (t, r) {
				var i;
				for (i = 0; i < r.rows.length; i++)
				{
					addElement(r.rows[i]);
					// addElement({ "id":"test", "nom":"test"});
					
				}
				callback();	
				
			
			}, function (t, e) {
			// couldn't read database
			console.log('erreur ' + e.message );
			});
		});
}
        

       
    }

    

}) ();