var myformValidator = new Validator("form-inscription");
		
$(document).ready(function () {	
		var test = false;
	

	
		
		myformValidator.addValidation("confirme_mdp", "eqelmnt=mdp", "Erreur, les mots de passe ne sont pas identiques");
		myformValidator.addValidation("mdp", "minlen=8", "Erreur, le mot de passe doit faire minimum 8 caractéres");
		myformValidator.addValidation("id", "req", "Erreur, il est necessaire de saisir un identifiant");
		myformValidator.addValidation("key", "req", "Erreur, il est necessaire de saisir un identifiant de Raspberry");
		myformValidator.addValidation("key", "num", "Erreur, l'identifiant de Raspberry ne contient que des chiffres");
		myformValidator.addValidation("email", "email", "Erreur, l'email est invalide");
		

		
			


	
		
		var testOK = false;
		
		$("#form-inscription").submit(function(e){
		       
			if (!testOK)
				{


				e.preventDefault();
				
				var frm = document.forms["form-inscription"];
				var path = $("#path").val();
				var pseudo = $("#id").val();
				var key = $("#key").val();
				
				var jqxhr = $.post( path, {id: pseudo, key: key}, function(data) {


					if (data == "ok")
					{
						testOK = true;
						$("#form-inscription").submit();
							
												
						
					}
					else if (data == "ko")
					{
						alert('Pseudo eja utilisé et code faux');
						 
						
					}
					else if (data == "pseudoKO")
					{
						alert('Pseudo eja utilisé');
						 
						
					}
					else if (data == "codeKO")
					{
						alert('code faux');
						
						
					}
					else
					{
						alert('echec de test du code et du pseudo');
						
						
					}



				})
				.fail(function() {
					alert( "Erreur pendant le test du pseudo et code" );
					 
				});


				}
		});
				
});

	