/**
 @author jb@noloading.com
 @class This class replicates the animation functions of MovieClip API of Adobe Flash. It is meant to be used with the "generate spritesheet" option of Adobe Flash CS6 but it uses CSS instead of Canvas.
 @param {String} img_url The url of the spritesheet image generated with the Generate spritesheet tool of FLash CS6.
 @param {Object} json_obj The corresponding json-data generated with the JSON-Array option of the spritesheet tool.
 @param {Number} fps_num The number of images/seconds, indicating the speed of the animation.
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $*/

function SpriteAnimation(img_url, json_obj, fps_num) {"use strict";

    var _context = this, interval, _ready_bool = false, _refreshSpeed_num = 1000 / fps_num, _framesToPlay_num = -1;

    this.tag_$ = $('<div></div>');
    this.currentFrame = 0;
    this.frames_json = json_obj;

    this.onReady = function() {

        //Event placeholder;
    };

    this.onClick = function() {

        //Event placeholder;

    };

    this.onFinish = function() {
        //Event placeholder;

    };

    this.stop = function() {
        clearInterval(interval);
    };

    this.loop = function() {
        clearInterval(interval);
        interval = setInterval(_nextFrameLoop, _refreshSpeed_num);
    };
    this.play = function(framesToPlay_num) {
        if (framesToPlay_num !== undefined) {

            _framesToPlay_num = framesToPlay_num;

        } else {

            _framesToPlay_num = -1;

        }

        clearInterval(interval);
        interval = setInterval(this.nextFrame, _refreshSpeed_num);

    };

    this.nextFrame = function() {
        var stop_bool = false;
        var finish_bool = false;
        var nextFrame = null;
        if (_framesToPlay_num !== -1) {

            _framesToPlay_num--;
            if (_framesToPlay_num === 0) {
                stop_bool = true;

            }

        }

        nextFrame = _context.currentFrame + 1;

        finish_bool = nextFrame > _context.totalFrames;

        stop_bool = stop_bool || finish_bool;

        if (!stop_bool) {
            _context.gotoFrame(_context.currentFrame + 1);
        } else {
            _context.stop();
        }
        if (finish_bool) {
            _context.onFinish();
        }
    };
    this.lastFrame = function() {

        _context.gotoFrame(_context.totalFrames - 1);

    };
    this.gotoAndPlay = function(frame_num) {

        this.gotoFrame(frame_num);
        this.play();

    };
    this.gotoAndStop = function(frame_num) {

        this.stop();
        this.gotoFrame(frame_num);

    };

    this.gotoFrame = function(frame_num) {
        if (_ready_bool && frame_num > 0 && frame_num <= _context.totalFrames) {
            _context.currentFrame = frame_num;
            var img_pos = _context.frames_json.frames[frame_num - 1].frame;
            _context.tag_$.css('background-position', -img_pos.x + 'px ' + -img_pos.y + 'px ');
        }

    };
    var _init = function() {

        _context.firstFrame_json = _context.frames_json.frames[0].frame;
        _context.tag_$.width(_context.firstFrame_json.w);
        _context.tag_$.height(_context.firstFrame_json.h);
        _context.tag_$.css('background-image', "url(" + img_url + ")");
        _context.totalFrames = _context.frames_json.frames.length;
        //_context.tag_$.height (data.frames[0].frame.h);

        //_context.tag_$.width (data.frames[0].frame.w);

        _ready_bool = true;
        _context.tag_$.on("click", function() {

            _context.onClick();

        });

    };
    var _nextFrameLoop = function() {
        var nextFrame = (_context.currentFrame + 1) % _context.totalFrames;
        _context.gotoFrame(nextFrame);

    };

    _init();

}