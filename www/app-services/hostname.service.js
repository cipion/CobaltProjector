(function () {
    'use strict';
	
	
    angular
        .module('app')
        .factory('HostnameService', HostnameService);
	
    HostnameService.$inject = [ '$http', '$cookies', '$rootScope', '$timeout'];
    function HostnameService($http, $cookies, $rootScope, $timeout) {
        var service = {};
		var networkState = {};
		
		
		
        service.Hostname = Hostname;
		
        
        return service;
		
        function Hostname() {
			
			networkState = navigator.connection.type;
			console.log("connexion : " + networkState );
			
			var ip = localStorage.getItem("ipServeur");
			console.log("IP = " + ip);
			
			if ( ip == null || networkState == "wifi")
			{
				raspberry_ip="homazing/HomAzing";
			}
			else if ( ip != null)
			{
				raspberry_ip= ip +"/HomAzing";
			}
			
			console.log("Hostname = " + raspberry_ip);

        }
		
		

       
    }


}) ();