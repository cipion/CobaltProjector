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
        
        service.addElement = addElement;
		service.suppElement = suppElement;
		
        return service;

        
		function addElement(element)
		{
			service.elements.push(element);
		
		}
		
		function suppElement(indexElement)
		{
			service.elements.splice(indexElement, 1);
		}
        

       
    }

    

}) ();