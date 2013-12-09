/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global SpriteAnimation, BMGame, PopupManager */

$(document).ready(function() {"use strict";
	var ui_$ = $("#ui");
	var popups_$ = ui_$.find('#popups');
	 
	//alert (popups_$.length);
	popups_$.detach();
	PopupManager.container_$ = ui_$;
	PopupManager.popups_$ = popups_$;
	PopupManager.display("intro");

	PopupManager.onClosePopup = function() {
	    switch (PopupManager.lastIdName) {
	        case "intro": 
	         
	        
		BMGame.init();
		break; 
		
		case "negativeResult":
		case "positiveResult":
		      PopupManager.display ('form'); 
		
		
		}; 
		

	};

});

