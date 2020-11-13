// const host='http://a.tdkji.com/';//域名
// const host='http://en.cqgdzy.com/';//域名

var url1 = window.location.href;
if (url1.includes('chinese')) {
	var host = 'http://39.97.180.149:83/zh/fastadmin/public/'; //域名
	var host1 = 'http://39.97.180.149:83/zh/fastadmin/public/'; //图片
} else {
	var host = 'http://39.97.180.149:83/en/fastadmin/public/'; //域名
	var host1 = 'http://39.97.180.149:83/en/fastadmin/public/'; //图片
}

//const host = 'http://192.144.229.82:8088/index.php/';
//const host1 = 'http://192.144.229.82:8088/'; //域名
const URL1 = 'http://39.97.180.149:83/'; //跳转的域名
// const URL='http://bearsdada.gitee.io/chineseenglish/chinese/';//跳转的域名
// const USERID=14;//用户名
const USERID = window.localStorage.getItem("user_id"); //用户名
$.getUrlParam = function (name) { //获取url参数方法
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;

}
//   $.getUrlParam('id')
function navigationFun() {
	$("input[name=searchVal]").focus(function () {
		$('.header_search').addClass('searchBoxStyle')
	})
	$("input[name=searchVal]").blur(function () {
		$('.header_search').removeClass('searchBoxStyle')
	})
	// $(window).ready(function(e) {
	// 	var lTop = $(".header_n3").offset().top;
	// 	$(window).scroll(function() {
	// 		var scBody = $("body").scrollTop() || $("html").scrollTop();
	// 		if (scBody >= lTop) {
	// 			$(".header_n3").css("position", "fixed").css("top", "0");
	// 			$(".headerNull").show()
	// 		} else {
	// 			$(".header_n3").css("position", "static");
	// 			$(".headerNull").hide()
	// 		}
	// 	})
	// })

	$('.headerNav ul li').hover(function () {
		$(this).find('.navBox').stop().animate({
			'height': 400 + 'px',
			'opacity': 1
		}, 400)
	}, function () {
		$(this).find('.navBox').stop().animate({
			'height': 0 + 'px',
			'opacity': 0
		}, 400)
	})

	$('.index_abt .n1').hover(function () {
		$(this).find('.about_li').show();
		$(this).find('.about_li').stop().animate({
			'top': 46 + 'px',
			'opacity': 1,
		}, 400)
	}, function () {
		$(this).find('.about_li').stop().animate({
			'top': 56 + 'px',
			'opacity': 0,
		}, 400, function () {
			$('.about_li').hide();
		})
	})



	$('.menuBox .menu').click(function () {
		if (!$(this).hasClass('isShow')) {
			$(this).addClass('isShow')
			$('.menuBox .menu').addClass('active')
			$('.header .header_n3 .headerNav ul').show()
		} else {
			$(this).removeClass('isShow')
			$('.menuBox .menu').removeClass('active')
			$('.header .header_n3 .headerNav ul').hide()

		}

	})



	$('.header .header_n1 .header_n1_left .languageSwitc').hover(function () {
		$(this).find('ul').show();
		$(this).find('ul').stop().animate({
			'top': 20 + 'px',
			'opacity': 1,
		}, 400)
	}, function () {
		$(this).find('ul').stop().animate({
			'top': 30 + 'px',
			'opacity': 0,
		}, 400, function () {
			$('.header .header_n1 .header_n1_left .languageSwitc ul').hide();
		})
	})

}



// 获取url id参数

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
