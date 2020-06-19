var turnplate={
	restaraunts:[],				//大转盘奖品名称
	colors:[],					//大转盘奖品区块对应背景颜色
	outsideRadius:286,			//大转盘外圆的半径，缩小转盘大小
	textRadius:200,			  	//大转盘奖品位置距离圆心的距离
	insideRadius:0,			    //大转盘内圆的半径
	startAngle:0,				//开始角度
	randomRate:[],              //控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
	bRotate:false				//false:停止;ture:旋转
};
turnplate.randomRate = ["0%","0%","0%","0%","0%"];
turnplate.restaraunts = ["定制 kindle","谢谢参与","大疆无人机","jmgo坚果投影仪","大疆无人机"];
turnplate.colors = ["#FCFAD9","#FCFAD9","#FCFAD9","#FCFAD9","#FCFAD9"];
// 开始抽奖
function start(){
	if(turnplate.bRotate)return;
	turnplate.bRotate = !turnplate.bRotate;
	//获取随机数(奖品个数范围内)
	var item = rnd(turnplate.randomRate);
	//奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
	rotateFn(item, turnplate.restaraunts[item-1]);
}

//旋转转盘 item:奖品位置; txt：提示语;
var rotateFn = function (item, txt){
	var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
	if(angles<270){
		angles = 270 - angles; 
	}else{
		angles = 360 - angles + 270;
	}
	$('#wheelcanvas').stopRotate();
	$('#wheelcanvas').rotate({
		angle:0,
		animateTo:angles+1800,
		duration:8000,
		callback:function (){
			turnplate.bRotate = !turnplate.bRotate;
			app.luckDrawClick = true;
			app.popup.show=true;
			console.log(turnplate.restaraunts[prizeId],'奖品名')
			if(turnplate.restaraunts[prizeId]!="谢谢参与"){
				app.popup.type="mqzj"
			}else{
				app.popup.type="wzj";
			}
		}
	});
};

function rnd(rate){
	var random = Math.floor(Math.random() * 100);
	var myRandom = [];
	var randomList = [];
	var randomParent = [];
	for(var i = 0; i < 100; i++){
		myRandom.push(parseInt([i]) + 1);
	}
	for(var i = 0; i < rate.length; i++){
		var temp = [];
		var start = 0;
		var end = 0;
		randomList.push(parseInt(rate[i].split('%')[0]));
		for(var j = 0; j < randomList.length; j++){
			start += randomList[j-1] || 0
			end += randomList[j]
		}
		temp = myRandom.slice(start, end);
		randomParent.push(temp)
	}
	for(var i = 0; i < randomParent.length; i++){
		if($.inArray(random, randomParent[i]) > 0){
			return(i+1)
		}
	}
	
}

//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
// window.onload=function(){
// 	drawRouletteWheel();
// }

function drawRouletteWheel() {   
  var canvas = document.getElementById("wheelcanvas");    
  if (canvas.getContext) {
	  //根据奖品个数计算圆周角度
	  var arc = Math.PI / (turnplate.restaraunts.length/2);
	  var ctx = canvas.getContext("2d");
	  //在给定矩形内清空一个矩形
	  ctx.clearRect(0,0,700,700);
	  //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
	  ctx.strokeStyle = "#000";
	  //font 属性设置或返回画布上文本内容的当前字体属性
	  ctx.font = '35px Microsoft YaHei';  
	  for(var i = 0; i < turnplate.restaraunts.length; i++) {       
		  var angle = turnplate.startAngle + i * arc;
		  ctx.fillStyle = turnplate.colors[i];
		  ctx.beginPath();
		  //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
		  ctx.arc(350, 350, turnplate.outsideRadius, angle, angle + arc, false);    
		  ctx.arc(350, 350, turnplate.insideRadius, angle + arc, angle, true);
		  ctx.stroke();  
		  ctx.fill();
		  //锁画布(为了保存之前的画布状态)
		  ctx.save();   
		  
		  //----绘制奖品开始----
		  if(app.isUsedCar){
			  ctx.fillStyle = "#F55707";
		  }else{
			ctx.fillStyle = "#CD4042";
		  }
		  var text = turnplate.restaraunts[i];
		  var line_height = 40;
		  //translate方法重新映射画布上的 (0,0) 位置
		  ctx.translate(350 + Math.cos(angle + arc / 2) * turnplate.textRadius, 350 + Math.sin(angle + arc / 2) * turnplate.textRadius);
		  
		  //rotate方法旋转当前的绘图
		  ctx.rotate(angle + arc / 2 + Math.PI / 2);
		  
		  /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
		  if(text.indexOf("谢谢参与")>-1){//流量包
			  var texts = text.split("谢谢参与");
			  for(var j = 0; j<texts.length; j++){
				//   ctx.fillStyle = "#9D9898";
				  if(j == 0){
					  ctx.fillText(texts[j]+"谢谢参与", -ctx.measureText(texts[j]+"谢谢参与").width / 2, j * line_height);
				  }else{
					  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
				  }
			  }
		  }else if(text.indexOf("谢谢参与") == -1){//奖品名称换行
				if(text.substring(9).length>10){
					text = text.substring(0,9)+"||"+text.substring(9,10)+"||"+text.substring(10);
				}else{
					text = text.substring(0,9)+"||"+text.substring(9);
				}
				var texts = text.split("||");
				for(var j = 0; j<texts.length; j++){
				ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
				}
		  }else{
			  //在画布上绘制填色的文本。文本的默认颜色是黑色
			  //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
			  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		  }
		  
		  //把当前画布返回（调整）到上一个save()状态之前 
		  ctx.restore();
		  //----绘制奖品结束----
	  }     
  } 
}
