/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $,PopupManager, SpriteAnimation */

var BMGame = {
	gameOver_bool:true, 

	init : function() {"use strict";
		//alert("init");

		$.ajax({
			url : "graphic/game/animation/icebreak.txt",
			dataType : "json"
		}).done(function(data) {

			var GRID_SIZE_NUM = 150;
			var COLUMNS_NUM = 6;
			var ROWS_NUM = 6;


			var n, row, column, iceAnimation, iceAnimationTag_$, random_num;
			var positions_array = [];
BMGame.stage_$ = $("#stage");
			BMGame.stage_$.addClass("stage");

			//alert("hello");

			for ( row = 0; row < ROWS_NUM; row++) {

				for ( column = 0; column < COLUMNS_NUM; column++) {
					positions_array.push([column * GRID_SIZE_NUM, row * GRID_SIZE_NUM]);

				}

			}
			var playAnim = function() {
				this.play(15);

			};
			var finishAnim = function() {

				BMGame.displayResult();
			};

			for ( n = 0; n < 5; n++) {
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

		});

	},  

	displayResult : function() {"use strict";

		var result_bool = Math.random() > 0.5;
		BMGame.stage_$.children ().unbind (); 

		if (result_bool) {
			PopupManager.display("positiveResult");
		} else {
			PopupManager.display("negativeResult");

		}

	},
	setup : function() {"use strict";

	}
}