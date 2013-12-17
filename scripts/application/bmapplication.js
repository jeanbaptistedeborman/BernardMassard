/*jslint vars:true, white:true, nomen: true, plusplus:true */
/*global SpriteAnimation, BMGame, UserAgent, Facebook,  PopupManager */

$(document).ready(function() {"use strict";
	//alert("with login - corrected 2");
	$('#connect').bind('click', function() {

	});
	$('.fb-like').hide (); 

	function preloadImage(url) {
		try {
			var _img = new Image();
			_img.src = url;
		} catch (e) {
		}
	}


	Facebook.onUserInfo = function() {
		//alert ('onuserinfo')
		$('.fb-login-button').hide();
			$('.fb-like').show (); 

	};

	preloadImage("graphic/game/animation/icebreak.png");
	if (UserAgent.anyMobile() && false) {


	} else {

	}

	$('.js_continue').css('display', 'none');
	var ui_$ = $("#ui");
	var popups_$ = ui_$.find('#popups');

	if (String(window.location.href).indexOf("azurewebsites") !== -1) {

		Facebook.appId = '669311946433468';
	} else {
		Facebook.appId = '1384449105138296';

	}( function(d) {

			var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement('script');
			js.id = id;
			js.async = true;
			js.src = "http://connect.facebook.net/fr_FR/all.js";
			ref.parentNode.insertBefore(js, ref);
		}(document));

	window.fbAsyncInit = function() {

		Facebook.launchInitSequence(Facebook.checkLike());

	};

	$("#gameContainer").hide();
	$(".js_continue").bind("click", function() {

		PopupManager.close($('#intro'));

	});

	popups_$.detach();
	PopupManager.container_$ = ui_$;
	PopupManager.popups_$ = popups_$;
	PopupManager.display("intro");
	Facebook.onDoesNotLike = function() {
		//$("#warning").addClass("blink");

	};

	Facebook.onLike = function() {
		//alert ('onlike');

		//$('.fb-like').css('display', 'none');
		$('.fb-like').hide();
		$('.js_continue').css('display', 'inline-block');

	};

	function manageForm() {

		//alert("manageForm");

		$("#form").find(".button").bind("click tap touch", function() {

			var form_$ = $("form"), data = {

			}, send_bool = true, n, mail_bool=true;

			form_$.find('input').each(function(index, element) {
				//alert ("each");

				var element_$ = $(element);
				var value = element_$.val();
				if (value === "on") {
					value = element_$.prop('checked');

				}

				data[element_$.attr("name")] = value;

			});
			data.answer = form_$.find("input[type='radio']:checked").val();

			//trace(data);

			for (n in data) {
				var value = data[n];
				if (value === undefined || value === null || value === "" || value == false) {
					//alert("value is null, false,  or undefined");
					send_bool = false;
				}

			}
			

			function validateForm() {
				var result = true; 
				var email_str = form_$.find("input[type='email']").val();
				var atpos = email_str.indexOf("@");
				var dotpos = email_str.lastIndexOf(".");
				if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email_str.length) {
					//alert("Not a valid e-mail address");
					result = false;
				}
				return (result)
			}
			mail_bool = validateForm(); 

			trace("Facebook.userInfo.id : " + Facebook.userInfo.id);
			data.facebook_id = Facebook.userInfo.id;
			
		

			if (send_bool && mail_bool) {

				$.ajax({
					url : "http://www.d1009502-4898.luxcloud.net/api/subscription.php",
					type : "POST",
					data : data
				}).done(function() {
					PopupManager.close($("#form"));

				});

			} else {
				if (!mail_bool) {
					alert("L'adresse e-mail n'est pas valide.");
					
				} else {
					alert("Tous les champs doivent être remplis.");
					
				}
				
				

			}

		});

	}


	PopupManager.onClosePopup = function() {
		switch (PopupManager.lastIdName) {
			case "intro":

				PopupManager.display('howToPlay');

				break;

			case "howToPlay" :

				BMGame.init();
				$('body').addClass('bg2');

				break;

			case "negativeResult":
			case "positiveResult":
				PopupManager.display('form');
				manageForm();
				break;

			case "form":
				PopupManager.display('thankYou');

				break;

		}

	};

});
