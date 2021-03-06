/*jslint vars:true, white:true, nomen: true, plusplus:true */
/*global $*/

PopupManager = {
	currentPopUp : null,
	container_$ : null,
	popups_$ : null,
	lastIdName : null,

	display : function(idName) {"use strict";
		//alert("popupmanager : " + idName);
		$('#gameContainer').hide();
		var popup_$ = this.popups_$.find("#" + idName);

		this.lastIdName = idName;
		if (popup_$.length === 0) {

			throw (new Error("PopupManager : no selection found matching idName : " + idName));
		}

		if (this.container_$) {
			this.container_$.append(popup_$); 

			popup_$.find(".js_close").bind("click touch", PopupManager._closeMe);

		} else {
			throw (new Error("Please set property  container_$ of PopupManager"));

		}

	},
	_closeMe : function() {"use strict";
		var this_$ = $(this);
		PopupManager.close(this_$.parent());

	},

	close : function(popup_$) {"use strict";
		PopupManager.onClosePopup();
		popup_$.fadeOut(500, function () {
			popup_$.detach (); 
			
		}); 
		//popup_$.detach();

	},
	onClosePopup : function() {"use strict";
	}
};
