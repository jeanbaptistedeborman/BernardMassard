/*global FB*/

Facebook = {
	appId : undefined,
	userInfo : {},
	authEventSubscribed_bool : false,
	initCallbackFunction : "",
	launchInitSequence : function(callbackFunction) {"use strict";

		alert ("init , scope changed");
		this.initCallbackFunction = callbackFunction;
	alert ("app id" + Facebook.appId);  
		FB.init({
		
			appId : Facebook.appId,
			status : true, // check login status
			cookie : true,

			xfbml : true // parse XFBML
		});
		if (!this.authEventSubscribed_bool) {
			this.authEventSubscribed_bool = true;

			FB.Event.subscribe('edge.create', function(href, widget) {
				Facebook.onLike();

			});

			FB.Event.subscribe('auth.authResponseChange', function(response) {
trace ("FACEBOOK AOTH" + response);
				if (response.status === 'connected') {
					Facebook.getUserInfo();
					Facebook.initCallbackFunction();
					//callback();
				} else if (response.status === 'not_authorized') {

					FB.login();
				} else {

					FB.login();
				}
			});
		}
	},

	checkLike : function() {"use strict";
		alert("checkLike");

		FB.api('/me/likes/65692241192', function(response) {
			trace("Like : " + response.data);
			if (response.data.length == 1) {
				Facebook.onLike();
			} else {
				Facebook.onDoesNotLike();

			}
		});

		

	},
	getUserInfo : function() {"use strict";
	alert ('connected user info'); 

		FB.api('/me', function(response) {
			Facebook.userInfo = response;
			Facebook.onUserInfo (); 
		});

	},
	onUserInfo:function  () {"use strict";
		
		
},
	onLike : function() {"use strict";
		//Event Placeholder;

	},
	onDoesNotLike : function() {"use strict";
		//Event Placeholder;

	}
};
