/*global FB*/

Facebook = {
    userInfo : {},
    authEventSubscribed_bool : false,
    initCallbackFunction : "",
    launchInitSequence : function(callbackFunction) {"use strict";
    
        alert ("init"); 
        this.initCallbackFunction = callbackFunction;

        FB.init({
            appId : '669311946433468',
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml : true // parse XFBML
        });
        if (!this.authEventSubscribed_bool) {
            this.authEventSubscribed_bool = true;

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

        FB.api({
            method : "pages.isFan",
            page_id : "607595305979967"
        }, function(response) {
            if (response) {
                Facebook.onLike();
            } else {
                Facebook.onDoesNotLike();
            }
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
