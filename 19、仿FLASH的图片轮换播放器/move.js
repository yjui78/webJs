// 1、封装计算样式
/*
        问题：加border时用offsetWidth-1反而加
        解决1：行内style，odiv.style.width
        解决2：系统样式 getcomputeStyle
        使用：parseInt(getStyle(obj,'width'))
 */
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name];
    }
}


// 2、任意值缓冲运动
/*
    适合任何属性
    使用：startMove(this,'width',300);

 */
function startMove(obj,attr,iTarget){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            //定时器运动时属性值变
        //curStyle当前计算属性值为opacity单独配置
            var curStyle =0;

            //透明度单独设置
            if(attr=='opacity'){
          //习惯*100 
          curStyle = Math.round(parseFloat(getStyle(obj,attr))*100);
        }else {
            //parseInt取整不适合opacity,
            curStyle = Math.round(parseInt(getStyle(obj,attr)));
        }
        //解决透明度计算不准问题Math.round
        var speed = (iTarget - curStyle)/6;
        speed = speed>0 ?Math.ceil(speed):Math.floor(speed);
        //设置运动curStyle替代offsetWidth
      
            if(curStyle == iTarget){
                  clearInterval(obj.timer);
            }else {
            if(attr =='opacity' ){
                document.title =attr;

                obj.style.filter = 'alpha(opacity:'+(curStyle+speed)+')';
                obj.style.opacity =(curStyle+speed)/100;
            }else {
                obj.style[attr] = curStyle+speed+'px';
            }
          }
        },30)
    }

// 3、封装class
 function getByClass(oParent,sClass) {
        var aMent = oParent.getElementsByTagName("*");
        var aEle = [];
        for (var i = 0; i < aMent.length; i++) {
            if (aMent[i].className == sClass) {
                aEle.push(aMent[i]);
            }
        }
        return aEle;
 };

