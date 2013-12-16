/*jslint vars:true, white:true, nomen: true, plusplus:true */
/*global SpriteAnimation, BMGame, UserAgent, Facebook,  PopupManager */

$(document).ready(function() {"use strict";
	alert("with login");
	var testLikeInterval;
	function preloadImage(url) {
		try {
			var _img = new Image();
			_img.src = url;
		} catch (e) {
		}
	}

	preloadImage("graphic/game/animation/icebreak.png");
	if (UserAgent.anyMobile() || rue) {
		//$('.fb-like').hide();

	} else {

		$('.fb-login-button').hide();
		Facebook.onUserInfo = function() {
			$('.fb-login-button').show();

		};
	}
	if (UserAgent.anyMobile() && false) {
		testLikeInterval = setInterval(function() {

			trace("testLikeInterval : " + testLikeInterval);
			Facebook.checkLike();

		}, 1000);

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
			js.src = "http://connect.facebook.net/en_US/all.js";
			ref.parentNode.insertBefore(js, ref);
		}(document));

	window.fbAsyncInit = function() {

		Facebook.launchInitSequence(Facebook.checkLike);

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
		clearInterval(testLikeInterval);

		$('.fb-like').css('display', 'none');
		$('.js_continue').css('display', 'inline-block');

	};

	function manageForm() {

		//alert("manageForm");

		$("#form").find(".button").bind("click tap touch", function() {

			var form_$ = $("form"), data = {

			}, send_bool = true, n;

			form_$.find('input').each(function(index, element) {
				//alert ("each");

				var element_$ = $(element);
				var value = element_$.val();
				if (value === "on") {
					value = element_$.prop('checked');
					//alert(value);

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
			data.fbid = Facebook.userInfo.id;

			if (send_bool) {

				$.ajax({
					url : "http://www.d1009502-4898.luxcloud.net/api/contest.php",
					type : "GET",
					data : data
				}).done(function() {
					PopupManager.close($("#form"));

				});

			} else {
				alert("Tous les champs doivent être remplis.");

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
