function Drag(){
    //初始化
    this.initialize.apply(this, arguments)
}
Drag.prototype = {
    //初始化
    initialize : function (drag, options){
        var flag1 = localStorage.getItem('flag1');
        console.log(flag1)
        if(flag1 =='true'){
            this.drag = this.$(drag);
            this._x = this._y = 0;
            this._moveDrag = this.bind(this, this.moveDrag);
            this._stopDrag = this.bind(this, this.stopDrag);
            this.setOptions(options);
            this.handle = this.$(this.options.handle);
            this.maxContainer = this.$(this.options.maxContainer);
            this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
            this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;
            this.limit = this.options.limit;
            this.lockX = this.options.lockX;
            this.lockY = this.options.lockY;
            this.lock = this.options.lock;
            this.onStart = this.options.onStart;
            this.onMove = this.options.onMove;
            this.onStop = this.options.onStop;
            // this.handle.style.cursor = "move";
            this.changeLayout();
            this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))
        }
    },
    changeLayout : function (){
        this.drag.style.right =0;
        this.drag.style.bottom = 0;
        this.drag.style.position = "fixed";
        this.drag.style.margin = "0";
    },
    startDrag : function (event){       
        var event = event || window.event;
        this._x = event.clientX - this.drag.offsetLeft;
        this._y = event.clientY - this.drag.offsetTop;
        this.addHandler(document, "mousemove", this._moveDrag);
        this.addHandler(document, "mouseup", this._stopDrag);
        event.preventDefault && event.preventDefault();
        this.handle.setCapture && this.handle.setCapture();
        this.onStart()
    },
    moveDrag : function (event){
        var event = event || window.event;
        var iTop = event.clientY - this._y;
        var iLeft = event.clientX - this._x;
        if (this.lock) return;
        this.limit && (iTop < 0 && (iTop = 0), iLeft < 0 && (iLeft = 0), iTop > this.maxTop && (iTop = this.maxTop), iLeft > this.maxLeft && (iLeft = this.maxLeft));
        this.lockY || (this.drag.style.top = iTop + "px");
        this.lockX || (this.drag.style.left = iLeft + "px");
        var iWinWidth = document.documentElement.clientWidth;
        var iWinHeight = document.documentElement.clientHeight;
        if(this.drag.offsetLeft<0){
            this.drag.style.left =0+'px';
        }else if(this.drag.offsetLeft>(iWinWidth-this.drag.offsetWidth)){
            this.drag.style.left =iWinWidth-this.drag.offsetWidth+'px';
        }
        if(this.drag.offsetTop<0){
            this.drag.style.top =0+'px';
        }else if(this.drag.offsetTop>(iWinHeight-this.drag.offsetHeight)){
            this.drag.style.top =iWinHeight-this.drag.offsetHeight+'px';
        }
        var flag1 = localStorage.getItem('flag1');
        var top = localStorage.getItem('top');
        if(flag1=='true'){
            this.onMove()
        }else {
            this.stopDrag();
            this.drag.style.left =0+'px';
            this.drag.style.top =top;
        }
        event.preventDefault && event.preventDefault();
    },
    stopDrag : function (){
        this.removeHandler(document, "mousemove", this._moveDrag);
        this.removeHandler(document, "mouseup", this._stopDrag);
        this.handle.releaseCapture && this.handle.releaseCapture();
        this.onStop()
    },
    //参数设置
    setOptions : function (options){
        this.options ={
            handle:            this.drag, //事件对象
            limit:            true, //锁定范围
            lock:            false, //锁定位置
            lockX:            false, //锁定水平位置
            lockY:            false, //锁定垂直位置
            maxContainer:    document.documentElement || document.body, //指定限制容器
            onStart:        function () {}, //开始时回调函数
            onMove:            function () {}, //拖拽时回调函数
            onStop:            function () {}  //停止时回调函数
        };
        for (var p in options) this.options[p] = options[p]
    },
    //获取id
    $ : function (id)
    {
        return typeof id === "string" ? document.getElementById(id) : id
    },
    //添加绑定事件
    addHandler : function (oElement, sEventType, fnHandler)
    {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
    },
    //删除绑定事件
    removeHandler : function (oElement, sEventType, fnHandler)
    {
        return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
    },
    //绑定事件到对象
    bind : function (object, fnHandler)
    {
        return function ()
        {
            return fnHandler.apply(object, arguments)   
        }
    }
};