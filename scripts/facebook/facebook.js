/*global FB*/

Facebook = {
	appId : undefined,
	userInfo : {},
	authEventSubscribed_bool : false,
	initCallbackFunction : "",
	launchInitSequence : function(callbackFunction) {"use strict";

	alert ("init , scope changed");
		this.initCallbackFunction = callbackFunction;

		FB.init({
			appId : Facebook.appId,
			status : true, // check login status
			cookie : true,
			scope : "user_likes,user_photos",

			xfbml : true // parse XFBML
		});
		if (!this.authEventSubscribed_bool) {
			this.authEventSubscribed_bool = true;

			FB.Event.subscribe('edge.create', function(href, widget) {
				Facebook.onLike();

			});

			FB.Event.subscribe('auth.authResponseChange', function(response) {

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
			trace(response.data);
			if (response.data.length == 1) {
				alert('Likes page');
				Facebook.onLike();
			} else {
				Facebook.onDoesNotLike();

			}
		});

		FB.api({
			method : "pages.isFan",
			page_id : "65692241192"
		}, function(response) {

		});

	},
	getUserInfo : function() {"use strict";

		FB.api('/me', function(response) {
			Facebook.userInfo = response;
		});

	},
	onLike : function() {"use strict";
		//Event Placeholder;

	},
	onDoesNotLike : function() {"use strict";
		//Event Placeholder;

	}
};
