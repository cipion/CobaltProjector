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
		var tensions = ["tension du Projecteur",230,380];
		var phases = ["monophasé","triphasé"];
		
		service.elements = [];
		service.tensions = tensions;
		service.phases = phases;
			
		service.openDatabase = openDatabase;
        service.addElement = addElement;
		service.suppElement = suppElement;
		service.populateDB = populateDB;
		service.showDocCount = showDocCount;
		service.getInfoElement = getInfoElement;
		
		
		
        
		
        return service;

        
		function addElement(value, callback)
		{
			
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
			var request = objectStore.add( {nom:value.nom,
				puissance: value.puissance,
				tension: value.tension,
				courant: value.courant,
				phase: value.phase});
		
			request.onsuccess = function(event) {
				console.log("done with insert");
				
				showDocCount(function(){
						callback();
					});
				
			};
		
		}
		
		function suppElement(indexElement, idElement, callback)
		{
			
			var request = db.transaction(["projecteurs"], "readwrite")
							.objectStore("projecteurs")
							.delete(Number(idElement));	
							
			console.log(request);
							
			request.onsuccess = function(event) {
				service.elements.splice(indexElement, 1);
				console.log("Element supprimé");
				showDocCount(function(){
						callback();
					});
			};
			request.onerror = function(event) {
				console.log("Erreur de suppression");
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
					objectStore = thisDb.createObjectStore("projecteurs", 
						{ keyPath: "id", autoIncrement:true });  
					objectStore.createIndex("id", "id", 
						{ unique: true, autoIncrement: true });
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
								ob.createIndex("id", 
										"id", { unique: true, autoIncrement: true });
								var trans = req.result;
								trans.oncomplete = function(e) {
								console.log("== trans oncomplete ==");
								}
							};
						}
						else {
							console.log("La versionest la même");
						}
					}
					else {
						console.log("db.setVersion impossible");
					}
					
					
					//populateDB();
					
					showDocCount(resultat);
					
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
		service.elements = [];
		
		var transaction = db.transaction(["projecteurs"], "readwrite");
		objectStore = transaction.objectStore("projecteurs");
		
		objectStore.openCursor().onsuccess = function(event) {  
				var cursor = event.target.result;  
				if (cursor) { 
					var element = {"nom":cursor.value.nom, "tension":cursor.value.tension, "courant":cursor.value.courant, "phase":cursor.value.phase, "puissance":cursor.value.puissance, "id":cursor.value.id}; 
			
					service.elements.push(element);
				
					cursor.continue();  
				}  
				else {  
				console.log("Done with cursor");
				}  
				
				callback();
			}; 
		}
		
		function getInfoElement(idElement, callback)
		{
			console.log("ProjecteurService : getInfoElement : id =" + idElement);
			
			var transaction = db.transaction(["projecteurs"], "readwrite");
			objectStore = transaction.objectStore("projecteurs");
			var request = objectStore.get(idElement);
			
			request.onerror = function(event) {
				console.log("Erreur lors de la recherche de l'obget id=" + idElement);
				callback("Erreur de chargement");
			};
			request.onsuccess = function(event) {
				console.log("Succes lors de la recherche de l'obget id=" + idElement + ", le nom du projecteur est " + request.result.nom);
				callback(request.result);
			};
						
			
		}
        

       
    }

    

}) ();