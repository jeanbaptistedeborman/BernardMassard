/*jslint vars:true, white:true, nomen: true, plusplus:true */
/*global SpriteAnimation, BMGame, Facebook,  PopupManager */

$(document).ready(function() {"use strict";

	//alert (Facebook);
	//$("#warning").addClass("blink");

	var ui_$ = $("#ui");
	var popups_$ = ui_$.find('#popups');

	trace("window.location.href : " + window.location.href);
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

		/*$(".js_checkLike").bind("click", function() {
		 //alert ("Facebook.userInfo.id : "+  Facebook.userInfo.id );
		 if (Facebook.userInfo.id === undefined) {

		 $("#warning").addClass("blink");
		 REMOVE THIS

		 PopupManager.close($('#intro'));
		 BMGame.init();

		 } else {

		 Facebook.launchInitSequence(Facebook.checkLike);
		 }

		 });
		 */
	};
//$(".js_continue").hide (); 
$ ("#gameContainer").hide (); 
	$(".js_continue").bind("click", function() {
		alert ("continue"); 
		PopupManager.close($('#intro'));
		BMGame.init();

	});

	popups_$.detach();
	PopupManager.container_$ = ui_$;
	PopupManager.popups_$ = popups_$;
	PopupManager.display("intro");
	Facebook.onDoesNotLike = function() {
		//$("#warning").addClass("blink");

	};

	Facebook.onLike = function() {
		//trace("ID ? :" + Facebook.userInfo.id);
		PopupManager.close($('#intro'));
		$(".jscheckLike").css("display", block);
		BMGame.init();

	};

	PopupManager.onClosePopup = function() {
		switch (PopupManager.lastIdName) {
			case "intro":

				break;

			case "negativeResult":
			case "positiveResult":
				PopupManager.display('form');
				break;

			case "form":

				var form_$ = $("form"), data = {
					fbid : "no-id"

				};
				trace("Facebook.id : " + Facebook.userInfo.id);

				data.fbid = Facebook.userInfo.id;

				trace(data);

				form_$.children().each(function(index, element) {
					var element_$ = $(element);
					trace(element_$.attr("name") + "/ " + element_$.attr("value"));
					data[element_$.attr("name")] = element_$.attr("value");

				});

				trace(data);
				$.ajax({
					url : "http://www.d1009502-4898.luxcloud.net/api/contest.php",
					type : "GET",
					data : data
				}).done(function() {

					//alert("sckfdghjkhg fdkgjkfgkf dkgfkgfk");
				});

				break;

		}

	};

});
