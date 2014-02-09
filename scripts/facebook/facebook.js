/*global FB*/

Facebook = {
	reload_bool : false,
	attempts_num : 0,
	appId : undefined,
	userInfo : {},
	authEventSubscribed_bool : false,
	initCallbackFunction : "",
	launchInitSequence : function(callbackFunction) {"use strict";
		this.initCallbackFunction = callbackFunction;
		//alert ("app id" + Facebook.appId);
		FB.init({

			appId : Facebook.appId,
			status : true, // check login status
			cookie : true,
			scope : "user_likes",
			xfbml : true // parse XFBML
		});

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {

				var uid = response.authResponse.userID;
				var accessToken = response.authResponse.accessToken;
				//alert ("connected");

			} else if (response.status === 'not_authorized') {
				//alert ("not authorised");
				Facebook.reload_bool = true;

			} else {
				Facebook.reload_bool = true;
				//alert ("not authorised 2");

			}
		});

		if (!this.authEventSubscribed_bool) {
			this.authEventSubscribed_bool = true;

			FB.Event.subscribe('edge.create', function(href, widget) {
				//trace ("event received");

				Facebook.onLike();

			});

			FB.Event.subscribe('auth.authResponseChange', function(response) {
				Facebook.attempts_num++;
				//alert(Facebook.reload_bool);
				if (Facebook.reload_bool) {

					window.location.reload();
				}

				if (response.status === 'connected') {
					Facebook.getUserInfo();

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
		//alert("checkLike");
		var like_bool = false;
		FB.api('/me/likes/65692241192', function(response) {
			alert ("response.data : " + response.data); 

			if (response.data) {
				if (response.data.length !== 0) {
					Facebook.onLike();
					like_bool = true; 
				}
			}
			if (!like_bool) {
				Facebook.onDoesNotLike();

			}

		});

		/* FB.api('/me/likes/1384449105138296', function(response) {

		 if (response.data) {

		 if (response.data.length !== 0) {
		 trace(response.data);
		 //alert ('page liked');
		 Facebook.onLike();
		 }
		 }
		 });
		 */

	},
	getUserInfo : function() {"use strict";
		//alert ('connected getting user info');

		FB.api('/me', function(response) {
			//alert (response);
			Facebook.checkLike();
			Facebook.userInfo = response;
			Facebook.onUserInfo();
		});

	},
	onUserInfo : function() {"use strict";
		//Event Placeholder;

	},
	onLike : function() {"use strict";
		//Event Placeholder;

	},
	onDoesNotLike : function() {"use strict";
		//Event Placeholder;

	}
};
