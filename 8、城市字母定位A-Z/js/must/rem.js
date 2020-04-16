//修改页面title
var pageTitle=document.getElementsByTagName("title")[0].innerHTML;
if(location.href.indexOf("index.html")>-1 || location.href.indexOf("html")==-1){
	document.getElementsByTagName("title")[0].innerHTML="这是一个通用的标题";
}
//微信JSSDK
document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>');
//rem自动计算
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
