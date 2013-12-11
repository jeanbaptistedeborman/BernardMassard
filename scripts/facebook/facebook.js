Facebook = {
    userInfo : {},
    launchInitSequence : function(callback) {

        FB.init({
            appId : '669311946433468',
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml : true // parse XFBML
        });

        FB.Event.subscribe('auth.authResponseChange', function(response) {

            //alert ("response reveived");

            if (response.status === 'connected') {
                getUserInfo();

                callback();
            } else if (response.status === 'not_authorized') {

                FB.login();
            } else {
                FB.login();
            }
        });
    },

    checkLike : function() {

        FB.api({
            method : "pages.isFan",
            page_id : "607595305979967",
        }, function(response) {
            console.log(response);
            if (response) {
                Facebook.onLike();
            } else {
                Facebook.onDoesNotLike();
            }
        });

    },
    getUserInfo : function() {

        FB.api('/me', function(response) {
            alert("GOT RESPONSE" + response);
            userInfo = response;
        });

    },
    onLike : function() {
        //Event Placeholder;

    },
    onDoesNotLike : function() {
        //Event Placeholder;

    }
};
