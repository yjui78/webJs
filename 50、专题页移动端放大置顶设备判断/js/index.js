var userAgentInfo = navigator.userAgent;
var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");   
var flag = 0; 
var v=0 
for ( v = 0; v < Agents.length; v++)  
{   
	if (userAgentInfo.indexOf(Agents[v]) > 0) { 
		if(Agents[v]=="iPad"){   //ipad如定义移动端去掉就行了

			flag = 1;
		}else{
			// 移动端
			flag = 2;
		}
		break;
	}
}

var app = new Vue({
	el: "#app",
	data: {

	},
	methods:{
		goTop: function () {
			$('html,body').animate({
				scrollTop: '0px',
			}, 500);
		},
	},
	mounted:function(){
		var _this=this;
		if(flag==2){
			//移动端放大
			var conWidth=parseInt($("#fit").width()+($("#fit").width()*0.5));
			$("#fit").css({
				"width":conWidth+"px",
				"left":"50%",
				"margin-left":-conWidth/2+"px"
			});
			$("body,html").css("width",$(window).width());
		}
	}
})