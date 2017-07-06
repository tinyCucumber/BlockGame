var color_list = ["blue", "purple", "green", "yellow"]
var type_list = ["a", "b", "c", "d"]
var score = -7;
/* 实现抖动 */
var trans_dire = ["trans-left", "trans-right"];
var i = 0;
var stop_shake = setTimeout(function() {
	$(".loading_cube").fadeOut(function() {
		window.clearInterval(shake);
		$(".ready,.button_go").show()
	});
}, 2000)
var shake = window.setInterval(function() {
	$(".cube").addClass(trans_dire[i])
	if (i == 0) {
		i = 1
		$(".cube").removeClass(trans_dire[i])
	} else {
		i = 0;
		$(".cube").removeClass(trans_dire[i])
	}
}, 80)


/* 下一关函数 */

var next_level = function(level) { //level是行数，err是不同那个的编号
	score = score + 7; //计算分数
	$(".score").html(score.toString())
	switch (score.toString().length) {
		case 1:
			$(".unit").html(score.toString().charAt(0))
			break;
		case 2:
			$(".decade").html(score.toString().charAt(0))
			$(".unit").html(score.toString().charAt(1))
			break;
		case 3:
			$(".hundred").html(score.toString().charAt(0))
			$(".decade").html(score.toString().charAt(1))
			$(".unit").html(score.toString().charAt(2))
			break;
		case 4:
			$(".kilobit").html(score.toString().charAt(0))
			$(".hundred").html(score.toString().charAt(1))
			$(".decade").html(score.toString().charAt(2))
			$(".unit").html(score.toString().charAt(3))
			break;
		default:

	}
	// if (level==8) {
	//   $(".content").fadeOut(function(){
	//     $(".finish").fadeIn(function(){
	//       do_score(1);
	//       window.clearInterval(dead_time);
	//     });
	//   });
	//
	//   return
	// }
	var cube_num = level * level;
	var size = 300 / level;
	var random_color = color_list[Math.floor(Math.random() * 4)]; //随机颜色
	var random_type = type_list[Math.floor(Math.random() * 4)]; //随机类型
	var cube_image = random_type + "-" + random_color + ".png"; //随机图片
	var err_type;
	do {
		err_type = type_list[Math.floor(Math.random() * 4)];
	} while (err_type == random_type);
	var err_image = err_type + "-" + random_color + ".png";
	var err_num = Math.floor(Math.random() * cube_num)
	$(".board").html("")
	for (var i = 0; i < cube_num; i++) {
		if (i == err_num) {
			$("<div class='board_cube'></div>")
				.css({
					"background-image": "url(./images/" + err_image + ")"
				})
				.appendTo(".board")
				.click(function() {
					if (level == 7) {
						next_level(level)
					} else {
						next_level(level + 1)
					};
					add_time(level);
				});
		} else if (i != err_num) {
			$("<div class='board_cube'></div>").css({
				"background-image": "url(./images/" + cube_image + ")"
			}).appendTo(".board");
		}
	}
	$(".board_cube").css({
		"height": size,
		"width": size
	});
}

/* 计时函数 */
var sev_width = 0.4;
var dead_time;

function time() {
	dead_time = window.setInterval(function() {
		var last_width = $(".dead_line>div").width() - sev_width;
		$(".dead_line>div").css({
			"width": last_width
		});
		if (last_width <= 0) { //游戏结束
			$(".content").fadeOut(function() {
				$(".finish").fadeIn(function() {
					do_score(1);
				});
			});
			window.clearInterval(dead_time);
		}
	}, 20)
}

function add_time(level) {
	var new_width;
	if (level == 2) {
		new_width = $(".dead_line>div").width() + 50;
	} else if (level == 3) {
		new_width = $(".dead_line>div").width() + 40;
	} else if (level == 4) {
		new_width = $(".dead_line>div").width() + 30;
	} else if (level == 5) {
		new_width = $(".dead_line>div").width() + 20;
	} else if (level == 6) {
		new_width = $(".dead_line>div").width() + 20;
	} else {
		new_width = $(".dead_line>div").width() + 10;
	}
	if (new_width > 300) {
		new_width = 300;
	}
	$(".dead_line>div").css({
		"width": new_width
	});
}
/* 控制音乐 */
function ctrl_music() {
	var music = document.getElementById("back_music");
	if (music.paused) {
		music.play()
		$(".music").removeClass("music_stop")
	} else {
		music.pause();
		$(".music").addClass("music_stop")
	}
}

function go_music() {
	var go = document.getElementById("go_music");
	go.play()
	$(".button_go,.ready").hide();
	$(".dead_line,.score").show();
}
$(document).ready(function() {
	$(".music").trigger("click");
});
/* 分享 再来一次*/
$("#share").click(function() {
	$(".mask").show();
	$("body,html").css({
		"overflow": "hidden"
	})
})


function updateUrl(url, key) {
	var key = (key || 't') + '='; //默认是"t"
	var reg = new RegExp(key + '\\d+'); //正则：t=1472286066028
	var timestamp = +new Date();
	if (url.indexOf(key) > -1) { //有时间戳，直接更新
		return url.replace(reg, key + timestamp);
	} else { //没有时间戳，加上时间戳
		if (url.indexOf('\?') > -1) {
			var urlArr = url.split('\?');
			if (urlArr[1]) {
				return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
			} else {
				return urlArr[0] + '?' + key + timestamp;
			}
		} else {
			if (url.indexOf('#') > -1) {
				return url.split('#')[0] + '?' + key + timestamp + location.hash;
			} else {
				return url + '?' + key + timestamp;
			}
		}
	}
}
$("#again").click(function() {
		window.location.href = updateUrl(window.location.href);
	})
	/* 提交 */
function do_score(status) {
	var name = $("form input").eq(0).val();
	var phone = $("form input").eq(1).val();
	var address = $("form input").eq(2).val();
	var data = "";
	if (status == 1) {
		data = {
			flag: status
		}
	} else {
		data = {
			name: name,
			address: address,
			phone: phone,
			score: score,
			flag: status
		}
	}
	$.ajax({
		url: "./php/score.php",
		type: "post",
		data: data,
		success: function(d) {
			if (d == "成功存入") {
				alert("提交成功！");
				window.location.href = updateUrl(window.location.href);
			} else {
				$(".finish_text span").html(d);
			}
		}
	})
}
