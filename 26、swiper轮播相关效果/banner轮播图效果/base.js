var  aLi = document.querySelectorAll('#tabs li');//arr,图索引
var oContainer = document.querySelector('#container');
var aDiv = document.querySelectorAll('#content div');
var aSpan = document.querySelectorAll('#arrow span');
var index=0;//上下图
var timer=null;
for(var i=0;i<aLi.length;i++){
    //循环时就存索引,js中没有属性index，自定义的
    aLi[i].index = i;
    //进入onclick前for已经循环到4
    aLi[i].onclick=function(){
        index=this.index;
        switchImg(this.index);
    }
}
//图片切换函数
function switchImg(idx){
    //去掉所有高亮
    for(var j=0;j<aLi.length;j++){
        aLi[j].className='';
        aDiv[j].className='';
    }
    //this.index =this.getAttribute('data-index')//或在html中加入自定义索引data-index属性
    aLi[idx].className='active';
    aDiv[idx].className='active';
}

//切换右测图片<
aSpan[0].onclick=function(){
    index--;
    if(index<0){
        index=aLi.length-1;
    }
    switchImg(index);
}
//>
aSpan[1].onclick=function(){
    index++;
    if(index==aLi.length){
        index=0;
    }
    switchImg(index);
}
//自动播放,调用点击>事件
timer = setInterval(function(){
    aSpan[1].onclick();
},1000)

oContainer.onmouseover = function(){
    clearInterval(timer);
    timer =null;
}
oContainer.onmouseout = function(){
    timer = setInterval(function(){
        aSpan[1].onclick();
    },1000)
}