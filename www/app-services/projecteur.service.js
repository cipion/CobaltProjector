(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjecteurService', ProjecteurService);
	
    ProjecteurService.$inject = [ '$http', '$cookies', '$rootScope', '$timeout'];
    function ProjecteurService($http, $cookies, $rootScope, $timeout) {
        var service = {};
		var db;
		var IDBTransaction;
		var dbVersion = 1.0;
		var openRequest;
		var objectStore;
		
		service.elements = [];
			
			
		service.openDatabase = openDatabase;
        service.addElement = addElement;
		service.suppElement = suppElement;
		service.populateDB = populateDB;
		service.showDocCount = showDocCount;
		
		
		
        
		
        return service;

        
		function addElement(id, value)
		{
			var element = '{"id":"' + id + '", "nom":"' + value.nom + '"}'; 
			
			service.elements.push(JSON.parse(element));
		
		}
		
		function suppElement(indexElement, nomElement)
		{
			
			var request = db.transaction(["projecteurs"], "readwrite")
							.objectStore("projecteurs")
							.delete(nomElement);
							
			request.onsuccess = function(event) {
				service.elements.splice(indexElement, 1);
				console.log("Element supprimé");
			};
		}
		
		
		function openDatabase(resultat)
		{
			if (!('indexedDB' in window)) {
				window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			}
			
			IDBTransaction = window.IDBTransaction || 
                     window.webkitIDBTransaction;
		
			openRequest = indexedDB.open("demo", dbVersion);
			
			//handle setup - as the spec like it
			openRequest.onupgradeneeded = function(e) {
				console.log("running onupgradeneeded");
				var thisDb = e.target.result;
			
				//temp delete if we want to start clean -> 
				//thisDb.deleteObjectStore("projecteurs");
			
				//Create projecteurs
				if(!thisDb.objectStoreNames.contains("projecteurs")) {
					console.log("I need to make the projecteurs objectstore");
					var objectStore = thisDb.createObjectStore("projecteurs", 
						{ keyPath: "id", autoIncrement:true });  
					objectStore.createIndex("nom", "nom", 
						{ unique: false });
				}
			}
	

			openRequest.onsuccess = function(e) {
				db = e.target.result;
				db.onerror = function(event) {
					// Generic error handler for all 
					// errors targeted at this database
					alert("Database error: " + event.target.errorCode);
					console.dir(event.target);
				};
					// Interim solution for Chrome to create an objectStore. 
					// Will be deprecated once it's fixed.
					if (db.setVersion) {
					console.log("in old setVersion: "+ db.setVersion);
						if (db.version != dbVersion) {
							var req = db.setVersion(dbVersion);
							req.onsuccess = function () {
								var ob = db.createObjectStore("projecteurs",
										{ keyPath: "id", autoIncrement:true });  
								ob.createIndex("nom", 
										"nom", { unique: false });
								var trans = req.result;
								trans.oncomplete = function(e) {
								console.log("== trans oncomplete ==");
								displayNotes();
								}
							};
						}
						else {
							displayNotes();
						}
					}
					else {
						displayNotes();
					}
					
					
					populateDB();
					
					showDocCount(function(){
						resultat();
					});
					
			}
			
			
			function displayNotes() {
				console.log("TODO - print something nice on the page");
			}
			
			
		}
		
		function populateDB() {
					
			var transaction = db.transaction(["projecteurs"], "readwrite");  
			transaction.oncomplete = function(event) {
				console.log("All done!");
			};
		
			transaction.onerror = function(event) {
				// Don't forget to handle errors!
				console.dir(event);
			};
			
			objectStore = transaction.objectStore("projecteurs");
			//use put versus add to always write, even if exists
			var request = objectStore.add( {nom:"projecteur 1",
				puissance: Math.floor(Math.random()*10000),
				tension: 230,
				courant: 5,
				phase: "mono"});
		
			request.onsuccess = function(event) {
				console.log("done with insert");
			};
			
			
			
		}
		
		function errorCB(err) {
			console.log("Erreur de creation de la table code : "+err.code);
		}
		
		function successCB() {
			console.log("Succes de creation de la table");
		}
		
		function showDocCount(callback) {
				
		objectStore.openCursor().onsuccess = function(event) {  
				var cursor = event.target.result;  
				if (cursor) {  
				addElement(cursor.key, cursor.value);
				cursor.continue();  
				}  
				else {  
				console.log("Done with cursor");
				}  
				
				callback();
			}; 
}
        

       
    }

    

}) ();