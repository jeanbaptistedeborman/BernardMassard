/*JSLint  */
/*global $*/

PopupManager = {
	currentPopUp : null,
	container_$ : null,
	popups_$ : null,
	lastIdName : null,

	display : function(idName) {"use strict";
		var popup_$ = this.popups_$.find("#" + idName);

		this.lastIdName = idName;
		if (popup_$.length === 0) {

			throw (new Error("PopupManager : no selection found matching idName : " + idName));
		}

		if (this.container_$) {
			this.container_$.append(popup_$);

			popup_$.find(".button").bind("click touch", PopupManager.close);

		} else {
			throw (new Error("Please set property container_$ of PopupManager"));

		}

	},
	close : function() {"use strict";
		var this_$ = $(this);
		this_$.parent().detach();
		PopupManager.onClosePopup();

	},
	onClosePopup : function() {"use strict";
	}
};
