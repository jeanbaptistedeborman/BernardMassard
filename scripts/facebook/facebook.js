/*global FB*/

Facebook = {
	attempts_num:0; 
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
		if (!this.authEventSubscribed_bool) {
			this.authEventSubscribed_bool = true;

			FB.Event.subscribe('edge.create', function(href, widget) {
				//trace ("event received"); 
				
				Facebook.onLike();

			});

			FB.Event.subscribe('auth.authResponseChange', function(response) {
				Facebook.attempts_num++;
				alert (Facebook.attempts_num);
				if (Facebook.attempts_num > 1) {
					
					window.location.reload (); 
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

		FB.api('/me/likes/65692241192', function(response) {
			trace("Like : ");
			
			
			if (response.data.length !== 0) {
				trace (response.data); 
				//alert ('page liked'); 
				Facebook.onLike();
			} else {
				Facebook.onDoesNotLike();

			}
		});

		

	},
	getUserInfo : function() {"use strict";
	//alert ('connected getting user info'); 

		FB.api('/me', function(response) {
			//alert (response); 
			Facebook.checkLike (); 
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
