/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global SpriteAnimation, BMGame, PopupManager */

$(document).ready(function() {"use strict";



alert (Facebook); 

( function(d) {

            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "http://connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

    window.fbAsyncInit = function() {

        Facebook.launchInitSequence();

        $(".js_checkLike").bind("click", function() {

            Facebook.launchInitSequence(Facebook.checkLike);

        })
    }
    var ui_$ = $("#ui");
    var popups_$ = ui_$.find('#popups');

    //alert (popups_$.length);
    popups_$.detach();
    PopupManager.container_$ = ui_$;
    PopupManager.popups_$ = popups_$;
    PopupManager.display("intro");
/*
    Facebook.onLike = function() {
        alert("onlike");
        PopupManager.close($('#intro'));
        BMGame.init();

    }
    */

    PopupManager.onClosePopup = function() {
        switch (PopupManager.lastIdName) {
            case "intro":

                break;

            case "negativeResult":
            case "positiveResult":
                PopupManager.display('form');

        };

    };

});

