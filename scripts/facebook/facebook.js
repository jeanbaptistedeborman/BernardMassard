Facebook  =  {
 launchInitSequence:function(callback) {
                FB.init({
                    appId : '669311946433468',
                    status : true, // check login status
                    cookie : true, // enable cookies to allow the server to access the session
                    xfbml : true // parse XFBML
                });

                FB.Event.subscribe('auth.authResponseChange', function(response) {
                
                	//alert ("response reveived"); 

                    if (response.status === 'connected') {

                        callback ();
                    } else if (response.status === 'not_authorized') {

                        FB.login();
                    } else {
                        FB.login();
                    }
                });
            },
            
            checkLike:function  () {
            //alert ("checklike"); 
            
            FB.api({
                    method : "pages.isFan",
                    page_id : "607595305979967",
                }, function(response) {
                    console.log(response);
                    if (response) {
                       Facebook.onLike (); 
                    } else {
                       Facebook.onDoesNotLike (); 
                    }
                });
            
            
            }, 
            useAPI:function () {
                //console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    //console.log('Good to see you, ' + response.name + '.');
                });
   
                

            }, 
            onLike:function (){
            //Event Placeholder; 
            trace ("empty event"); 
            
            }, 
            onDoesNotLike:function (){
            //Event Placeholder; 
            
            }
            
     

             

            }; 
            