window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
window.onload=function(){
	//找到id为top_box下的类为app_jd的1个元素
	//再找到id为top_box下的类为service的1个元素
	//为两个元素绑定相同的
	//onmouseover和onmouseout事件处理函数
	//找到id为category的div，绑定onmouseover事件
	// $("#category")[0].addEventListener(
	// 	"mouseover",showCate,false);
	// $("#category")[0].addEventListener(
	// 	"mouseout",hideCate,false);

	//找到id为cate_box下的所有直接li，存为lis
	var lis=$("#cate_box>li");
	//遍历lis中每个li
	for(var i=0;i<lis.length;i++){
	//    为当前li绑定onmouseover和onmouseout事件
		lis[i].onmouseover=showSubCate;
		lis[i].onmouseout=hideSubCate;
	}
    //切换选中，先移除所有selected，当前在添加selected
    var ass = $('#choose_color a');
    for(var i=0;i<ass.length;i++){
        ass[i].onclick=function(){
            for(var i=0;i<ass.length;i++){
                ass[i].className='';
            }
            this.className='selected';
        }
    }
	//初始化商品图片对象
	pPhoto.init();
}
/*当鼠标进入一级分类时，显示当前li下的.sub_cate_box*/
function showSubCate(){
	//如何保持h3的hover状态
	this.$("h3")[0].className="hover";
	this.$(".sub_cate_box")[0].style.display="block";
}
/*当鼠标移出一级分类时，隐藏当前li下的.sub_cate_box*/
function hideSubCate(){
	//如何去掉h3的hover状态
	this.$("h3")[0].className="";
	this.$(".sub_cate_box")[0].style.display="";
}
/*当鼠标进入全部商品分类时，显示id为cate_box的元素*/
function showCate(){
	this.$("#cate_box")[0].style.display="block";
}
/*当鼠标进入全部商品分类时，隐藏id为cate_box的元素*/
function hideCate(){
	this.$("#cate_box")[0].style.display="none";
}
/*鼠标进入li时，显示下方的_items的元素*/
function showItems(){
	//在当前元素下找id以_items结尾的元素
	//直接修改该元素的style属性下的display为block
	this.$("[id$='_items']")[0].style.display="block";
	//找到当前li下的第一个a，设置className属性为hover
	this.$("a")[0].className="hover";
}
/*鼠标进入li时，隐藏下方的_items的元素*/
function hideItems(){
	//在当前元素下找id以_items结尾的元素
	//直接修改该元素的style属性下的display为""
	this.$("[id$='_items']")[0].style.display="";
	//找到当前li下的第一个a，设置className属性为""
	this.$("a")[0].className="";
}
/*包含小图片的移动，中图片的更换，放大图*/
var pPhoto={
	LIWIDTH:62, 	//每个下图片li的固定宽度
	moved:0, 		//记录当前左移的小图片个数
	count:0, 		//记录小图片的总数
	ul:null, 		//小图片的父元素ul
	btnL:null, 		//左边的按钮——ul右移
	btnR:null, 		//右边的按钮——ul左移
	superMask:null,	//放大图div
	SUPERWIDTH:350, //整个superMask的宽和高
	SUPERHEIGHT:350,
	MASKWIDTH:175, 	//遮罩层mask的宽高
	MASKHEIGHT:175,
	init:function(){
		this.ul=$("#icon_list")[0];
		this.ul.onmouseover=this.changeMImg;//this-->ul
		this.btnL=this.ul.parentNode.$("a")[0];
		this.btnR=this.ul.parentNode.$("a")[1];
		this.btnL.onclick=this.btnR.onclick=function(){
			//this-->按钮对象
			pPhoto.move(this);
		};
		this.count=this.ul.$("li").length;

		//找到id为superMask的div
		this.superMask=$("#superMask")[0];
		//为superMask绑定onmouseover和onmouseout事件
		this.superMask.onmouseover=
			this.superMask.onmouseout=this.showMask;
		this.superMask.onmousemove=function(){
			var e=window.event||arguments[0];
			pPhoto.zoom(e);
		}
	},
	/*当鼠标在superMask上移动时，同时移动mask
		同时改变largeDiv中背景图片位置*/
	zoom:function(e){//this-->pPhoto
		//获得鼠标相对于目标元素的坐标x，y
		var x=e.offsetX;
		var y=e.offsetY;
		//分别计算mTop=y-MASKHEIGHT/2
		//        mLeft=x-MASKWIDTH/2
		var mTop=y-this.MASKHEIGHT/2;
		var mLeft=x-this.MASKWIDTH/2;
		//如果mTop<0，就mTop=0;
		//如果mTop>SUPERHEIGHT-MASKHEIGHT，
		//		就等于SUPERHEIGHT-MASKHEIGHT
		mTop<0&&(mTop=0);
		mTop>this.SUPERHEIGHT-this.MASKHEIGHT&&
			 (mTop=this.SUPERHEIGHT-this.MASKHEIGHT);
		//如果mLeft<0，就mLeft=0;
		//如果mLeft>SUPERWIDTH-MASKWIDTH，
		//		就等于SUPERWIDTH-MASKWIDTH
		mLeft<0&&(mLeft=0);
		mLeft>this.SUPERWIDTH-this.MASKWIDTH&&
			 (mLeft=this.SUPERWIDTH-this.MASKWIDTH);
		//找到mask元素，
		// 设置它的top为mTop，left为mLeft
		$("#mask")[0].style.top=mTop+"px";
		$("#mask")[0].style.left=mLeft+"px";
		//根据mTop,mLeft修改largeDiv的背景图片位置
		$("#largeDiv")[0].style.backgroundPosition= -mLeft*2+"px "+-mTop*2+"px"; 
	},
	/*当鼠标进入superMask时，显示mask
	  当鼠标移出superMask时，隐藏mask
	  同时显示遮罩层和大图片！
	  并给大图片div设置背景图片*/
	showMask:function(){
		var mask=$("#mask")[0];//找到遮罩层
		var style=getComputedStyle(mask);
		mask.style.display=//将遮罩层的display颠倒
			style.display=="none"?"block":"none";
		var largeDiv=$("#largeDiv")[0];//找大图片div
		//将大图片display设置为和mask的display相同
		largeDiv.style.display=mask.style.display;
//如果大图片显示，则根据中图片路径修改largeDiv背景
		if(largeDiv.style.display=="block"){
			var path=$("#mImg")[0].src;
			//xx\xx\product-s1-m.jpg
			//xx\xx\product-s1-l.jpg
			var i=path.lastIndexOf(".");
			$("#largeDiv")[0].style.backgroundImage=
				"url('"+
				path.slice(0,i-1)+"l"+path.slice(i)+
				"')";
		}
	},
	move:function(btn){//this-->pPhoto
		if(!btn.className.endsWith("_disabled")){
			//如果当前点击的右边按钮
			if(btn==this.btnR){
				//==其实比较的是两变量中的对象地址
			//    moved加1
			//    修改ul的style的left属性为:
			//                   -(LIWIDTH*moved+20)
				this.ul.style.left=
				-(this.LIWIDTH*(++this.moved)-20)+"px";
			}else{
				this.ul.style.left=
				-(this.LIWIDTH*(--this.moved)-20)+"px";
			}
			this.btnEnable();
		//pPhoto
		}
	},
	//根据count和moved两个值得关系
	//修改两按钮的状态
	btnEnable:function(){//this-->pPhoto
		//如果moved==0，
		if(this.moved==0){
		//左边按钮的className+="_disabled";
			this.btnL.className+="_disabled";
		}else if(this.count-this.moved==5){
			//否则，如果count-moved==5
		//右边按钮的className+="_disabled";
			this.btnR.className+="_disabled";
		}else{//否则
		//    将两按钮的className属性中的_disabled
		//    替换为""，再返回className中
this.btnL.className=
	this.btnL.className.replace("_disabled","");
this.btnR.className=
	this.btnR.className.replace("_disabled","");
		}
	},
	/*当鼠标进入img元素时，
	  根据小img的src路径更改中图片的路径。
	  注意：直接传递给ul的mouseover事件作为回调
	        所以，this-->ul*/
	changeMImg:function(){
		//先获得事件对象e
		var e=window.event||arguments[0];
		//再获得目标元素src
		var src=e.srcElement||e.target;
		//判断如果*目标元素*是IMG
		if(src.nodeName=="IMG"){
		//   取出目标元素的src属性,存入path
			var path=src.src;
		//   path变量的.之前插入"-m"，存回path中
		//   比如：xx\xx\product-s1.jpg
		//                         i
		//         xx\xx\product-s1-m.jpg
		//         xx\xx\product-s1-l.jpg
		    var i=path.lastIndexOf(".");
		//	 找到id为mImg的元素，设置其src属性为path
			$("#mImg")[0].src=
				path.slice(0,i)+"-m"+path.slice(i);
		}
	}
}