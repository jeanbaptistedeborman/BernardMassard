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

			popup_$.find(".js_close").bind("click touch", PopupManager._closeMe);

		} else {
			throw (new Error("Please set property  container_$ of PopupManager"));

		}

	},
	_closeMe:function () {"use strict";
	    var this_$ = $(this);
	    close (this_$.parent()); 
	    
	    
	}, 
	
	close : function(popup_$) {"use strict";
	
		popup_$.detach();
		PopupManager.onClosePopup();

	},
	onClosePopup : function() {"use strict";
	}
};
