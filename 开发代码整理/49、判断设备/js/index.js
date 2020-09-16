

// 区分ipad,H5,PC
var userAgentInfo = navigator.userAgent;
var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");   
var flag = 0; 
var v=0 
for ( v = 0; v < Agents.length; v++)  
{   
	if (userAgentInfo.indexOf(Agents[v]) > 0) { 
		if(Agents[v]=="iPad"){   //ipad如定义移动端去掉就行了,这里ipad按PC端计算
			flag = 1;
		}else{
			// 移动端
			flag = 2;
		}
		break;
	}
}

// 区分H5,PC
/*
if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|SymbianOS/i.test(navigator.userAgent)) {
	// 移动端
	window.flag = 2
} else {
	// PC端
	window.flag = 1
}
*/
// flag页面中用的VUE写法，需要加VUE声明
var app = new Vue({
	el: "#app",
	data: { },
	methods:{ },
	mounted:function(){ }
})