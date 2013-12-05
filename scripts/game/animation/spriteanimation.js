/**
 * @author jb@noloading.com
 *@class This class replicates the animation functions of MovieClip API of Adobe Flash. It is meant to be used with the "generate spritesheet" option of Adobe Flash CS6 but it uses CSS instead of Canvas.
 @param {String} img_url The url of the spritesheet image generated with the Generate spritesheet tool of FLash CS6.
 @param {Object} json_obj The corresponding json-data generated with the JSON-Array option of the spritesheet tool.
 @param {Number} fps_num The number of images/seconds, indicating the speed of the animation.
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $*/

function SpriteAnimation(img_url, json_obj, fps_num) {"use strict";

    var context = this, interval, ready_bool = false, refreshSpeed_num = 1000 / fps_num;
    this.tag_$ = $('<div></div>');
    this.currentFrame = 0;
    this.frames_json = json_obj;

    this.onReady = function() {
    };

    this.stop = function() {
        clearInterval(interval);
    };

    this.loop = function() {
        clearInterval(interval);
        interval = setInterval(_nextFrameLoop, refreshSpeed_num);
    };
    this.play = function() {
        clearInterval(interval);
        interval = setInterval(this.nextFrame, refreshSpeed_num);

    };

    this.nextFrame = function() {
        var nextFrame = context.currentFrame + 1;
        if (nextFrame <= context.totalFrames) {
            context.gotoFrame(context.currentFrame + 1);
        } else {
            context.stop();
        }
    };
    this.lastFrame = function() {

        context.gotoFrame(context.totalFrames - 1);

    };

    this.gotoAndStop = function(frame_num) {

        this.stop();
        this.gotoFrame(frame_num);

    }; 

    this.gotoFrame = function(frame_num) {
        if (ready_bool && frame_num > 0 && frame_num <= context.totalFrames) {
            context.currentFrame = frame_num;
            var img_pos = context.frames_json.frames[frame_num - 1].frame;
            context.tag_$.css('background-position', -img_pos.x + 'px ' + -img_pos.y + 'px ');
        }

    };
    var _init = function() {
        trace("context.frames_json : " + context.frames_json);

        context.firstFrame_json = context.frames_json.frames[0].frame;
        context.tag_$.width(context.firstFrame_json.w);
        context.tag_$.height(context.firstFrame_json.h);
        context.tag_$.css('background-image', "url(" + img_url + ")");
        context.totalFrames = context.frames_json.frames.length;

        ready_bool = true;

    };
    var _nextFrameLoop = function() {
        var nextFrame = (context.currentFrame + 1) % context.totalFrames;
        context.gotoFrame(nextFrame);

    };

    _init();

}