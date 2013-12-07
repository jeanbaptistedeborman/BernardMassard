/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global SpriteAnimation*/

$(document).ready(function() {"use strict";

	$.ajax({
		url : "graphic/game/animation/icebreak.json",
		dataType : "json"
	}).done(function(data) {

		var GRID_SIZE_NUM = 300;
		var COLUMNS_NUM = 5;
		var ROWS_NUM = 4;

		var stage_$ = $("body");

		var n, row, column, iceAnimation, iceAnimationTag_$, random_num;
		var positions_array = [];

		stage_$.addClass("stage");

		alert("hello");

		for ( row = 0; row < ROWS_NUM; row++) {
			//alert (row);
			for ( column = 0; column < COLUMNS_NUM; column++) {
				positions_array.push([column * GRID_SIZE_NUM, row * GRID_SIZE_NUM]);

			}

		}
		//alert(positions_array);
		var playAnim = function() {
			this.play(10);

		};

		for ( n = 0; n < 5; n++) {
			random_num = Math.floor(Math.random() * positions_array.length);

			trace(positions_array.length + "/ " + random_num);

			var position_array = positions_array.slice(random_num, random_num+1)[0];
			trace(position_array);
			iceAnimation = new SpriteAnimation("graphic/game/animation/icebreak.png", data, 36);
			iceAnimationTag_$ = iceAnimation.tag_$;
			iceAnimationTag_$.addClass("iceAnimation");

			iceAnimationTag_$.css("top", position_array[0]).css("left", position_array[1]);
			stage_$.append(iceAnimation.tag_$);
			iceAnimation.onClick = iceAnimation.onClick = playAnim;
			//iceAnimation.play();

		}

	});

});

