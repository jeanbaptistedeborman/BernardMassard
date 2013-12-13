/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $,PopupManager,Facebook, SpriteAnimation */

var BMGame = {
	gameOver_bool : true,
	impactAnimation : {},
	cursorPos : [],
	startDragPoint : [],
	dragInterval : null,
	init : function() {"use strict";

		document.onmousemove = function(e) {

			BMGame.cursorPos[0] = e.pageX;
			BMGame.cursorPos[1] = e.pageY;

			//trace ("movement : " + e.movementX);
		};

		$.ajax({

			url : "graphic/game/animation/impact.txt",
			dataType : "json"

		}).done(function(data) {
			BMGame.impactAnimation = new SpriteAnimation("graphic/game/animation/impact.png", data, 24);
			BMGame.impactAnimation.tag_$.addClass('impact');
			BMGame.impactAnimation.onFinish = function() {

				BMGame.impactAnimation.tag_$.detach();

			};

		});

		$.ajax({
			url : "graphic/game/animation/icebreak.txt",
			dataType : "json"
		}).done(function(data) {

			var GRID_SIZE_NUM = 150;
			var COLUMNS_NUM = 10;
			var ROWS_NUM = 10;

			var n, row, column, iceAnimation, iceAnimationTag_$, random_num;
			var positions_array = [];
			BMGame.stage_$ = $("#stage");
			BMGame.stage_$.addClass("stage");

			BMGame.stage_$.css('top', -(BMGame.stage_$.height() - BMGame.stage_$.parent().height()) / 2);
			BMGame.stage_$.css('left', -(BMGame.stage_$.width() - BMGame.stage_$.parent().width()) / 2);

			for ( row = 0; row < ROWS_NUM; row++) {

				for ( column = 0; column < COLUMNS_NUM; column++) {
					positions_array.push([column * GRID_SIZE_NUM, row * GRID_SIZE_NUM]);

				}

			}
			var playAnim = function() {

				//var impactTag_$ = BMGame.impactAnimation.tag_$;
				this.play(10);
				/* KEEP KEEP KEEP
				 //BMGame.stage_$.append(BMGame.impactAnimation.tag_$);
				 //impactTag_$.css ("top", BMGame.cursorPos[1] -  impactTag_$.height ());
				 //impactTag_$.css ("left", BMGame.cursorPos[0]  - impactTag_$.width ()/2);
				 */

				BMGame.impactAnimation.gotoAndPlay(1);

			};
			var finishAnim = function() {

				BMGame.displayResult();
			};

			for ( n = 0; n < 10; n++) {
				var position_array;
				random_num = Math.floor(Math.random() * positions_array.length);
				position_array = positions_array.splice(random_num, random_num+1)[0];
				iceAnimation = new SpriteAnimation("graphic/game/animation/icebreak.png", data, 36);
				iceAnimationTag_$ = iceAnimation.tag_$;
				iceAnimationTag_$.addClass("iceAnimation");

				iceAnimationTag_$.css("top", position_array[0]).css("left", position_array[1]);
				BMGame.stage_$.append(iceAnimation.tag_$);
				iceAnimation.onClick = playAnim;
				iceAnimation.onFinish = finishAnim;

			}
			BMGame.manageDrag();

		});

	},

	manageDrag : function() {"use strict";

		this.stage_$.bind("mousedown", function() {
			var newPos_array = [];
			var minX = BMGame.stage_$.parent().width() - BMGame.stage_$.width();
			var maxX = 0;
			var minY = BMGame.stage_$.parent().height() - BMGame.stage_$.height();
			var maxY = 0;
			BMGame.startDragPoint = [BMGame.cursorPos[0], BMGame.cursorPos[1]];

			BMGame.dragInterval = window.setInterval(function() {

				var diff_array = [BMGame.cursorPos[0] - BMGame.startDragPoint[0], BMGame.cursorPos[1] - BMGame.startDragPoint[1]];
				BMGame.startDragPoint = [BMGame.cursorPos[0], BMGame.cursorPos[1]];
				//trace("BMGame.stage_$.position().left  : " + BMGame.stage_$.position().left);
				newPos_array[0] = BMGame.stage_$.position().left + diff_array[0];
				newPos_array[1] = BMGame.stage_$.position().top + diff_array[1];

				//trace(minX);

				if (newPos_array[0] < minX) {

					newPos_array[0] = minX;

				}

				if (newPos_array[0] > maxX) {

					newPos_array[0] = maxX;

				}

				if (newPos_array[1] > maxY) {

					newPos_array[1] = maxY;

				}

				if (newPos_array[1] < minY) {

					newPos_array[1] = minY;

				}

				BMGame.stage_$.css("left", newPos_array[0]);
				BMGame.stage_$.css("top", newPos_array[1]);

				BMGame.startDragPoint = [BMGame.cursorPos[0], BMGame.cursorPos[1]];

			}, 0.05);

			$(window).bind("mouseup", function() {

				//alert("mouseup");
				window.clearInterval(BMGame.dragInterval);

			});

		});

	},

	displayResult : function() {"use strict";

		BMGame.stage_$.children().unbind();

		$.ajax({
			url : "http://www.d1009502-4898.luxcloud.net/api/contest.php",
			data : {
				fbid : Facebook.userInfo.id
			},
			type : "GET"
		}).done(function(data) {
			alert(data);
			var result_bool = Boolean(data.winner);

			if (result_bool) {
				PopupManager.display("positiveResult");
			} else {
				PopupManager.display("negativeResult");

			}

		});

	},
	setup : function() {"use strict";

	}
}