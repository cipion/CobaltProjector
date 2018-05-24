(function () {
    'use strict';

    angular
        .module('app')
        .factory('MaisonService', MaisonService);
	
    MaisonService.$inject = [ '$http', '$cookies', '$rootScope', '$timeout', 'HostnameService'];
    function MaisonService($http, $cookies, $rootScope, $timeout, HostnameService) {
        var service = {};

        service.GetListePieces = GetListePieces;
        

        return service;

        function GetListePieces(idMaison, callback) {
			
			HostnameService.Hostname();
			
			
			$http({
				url: 'http://' + raspberry_ip + '/webService/listePieces',
				method: "POST",
				params: {'idMaison':idMaison},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				withCredentials: "true"
			}).then(function successCallback(response) {
					callback(response); 
				}, function errorCallback(response) {
					callback(response); 
				});
			

			
            

        }

        

       
    }

    

}) ();