/**
 * 公共方法
 */
    var APIURL = 'http://alfaromeo.test.bjscfl.com/api/user';
	var common = {};
    common.ajax = function(params){
		if (params) {
			return new Promise((resolve, reject) => {
				!params.data && (params.data = {})
				// params.data['sessionId'] = 721
				$.ajax({
					type: params.type || 'post',
					url: APIURL + params.url || null,
					dataType:'json',
					data: params.data || null,
					success: function (res) {
						if(res.code != 200 && res.msg){
							vue.$toast(res.msg);
						}
						resolve(res)
					},
					error: function (err) {
						reject(err)
					}
				});
			})
		}
    }
    /**
     * 获取浏览器url参数
     */
    common.getQueryString = function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = '';
        try{
            r = location.href.split('?')[1].match(reg);
        }catch(err){}
        if (r != null && r != 'undefined') {
            return unescape(r[2]);
        }
        return null;
	}
	
	// 时间chuo转字符串
	common.formatTime = (d) => {
		let date = new Date(parseInt(d) * 1000)
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = date.getSeconds()
		return [year, month, day].map(n => {
			n = n.toString()
			return n[1] ? n : '0' + n
		}).join('-') + ' ' + [hour, minute, second].map(n => {
			n = n.toString()
			return n[1] ? n : '0' + n
		}).join(':')
	}
	// GMT 中国标准时间转换为字符串 2019-09-09 02:03:09
	common.formatDate = GMT => {
		const Y = GMT.getFullYear()
		const M = (GMT.getMonth() + 1) > 9 ? (GMT.getMonth() + 1) : '0' + (GMT.getMonth() + 1)
		const D = GMT.getDate() > 9 ? GMT.getDate() : '0' + GMT.getDate()
		const H = GMT.getHours() > 9 ? GMT.getHours() : '0' + GMT.getHours()
		const T = GMT.getMinutes() > 9 ? GMT.getMinutes() : '0' + GMT.getMinutes()
		const S = GMT.getSeconds() > 9 ? GMT.getSeconds() : '0' + GMT.getSeconds()
		// const dateTIme = Y + '-' + M + '-' + D + ' ' + H + ':' + T + ':' + S
		const dateTIme = Y + '-' + M + '-' + D
		return dateTIme
	}

	// GMT 中国标准时间转换为字符串 2019-09-09 02:03:09
	common.formatDateTime = GMT => {
		const Y = GMT.getFullYear()
		const M = (GMT.getMonth() + 1) > 9 ? (GMT.getMonth() + 1) : '0' + (GMT.getMonth() + 1)
		const D = GMT.getDate() > 9 ? GMT.getDate() : '0' + GMT.getDate()
		const H = GMT.getHours() > 9 ? GMT.getHours() : '0' + GMT.getHours()
		const T = GMT.getMinutes() > 9 ? GMT.getMinutes() : '0' + GMT.getMinutes()
		const S = GMT.getSeconds() > 9 ? GMT.getSeconds() : '0' + GMT.getSeconds()
		const dateTIme = Y + '-' + M + '-' + D + ' ' + H + ':' + T + ':' + S
		return dateTIme
	}

	// 初始化table滚动条时间
	common.tableInit = function(){
		$('.table__body-wrapper').unbind();
		$('.table__body-wrapper').scroll(function(){
			var leftNum = $(this).scrollLeft();
			// console.log(leftNum)
			$('.table__header-wrapper').scrollLeft(leftNum)
			$('.table__fixed-body-wrapper').scrollTop($(this).scrollTop())
			if(leftNum>0){
				$('.table__fixed').addClass('box-shadow')
			}else{
				$('.table__fixed').removeClass('box-shadow')
			}
		})
	}

	// 排序
	common.sort = function(data,key,trans){
		var ndata = data.sort(function(obj1,obj2){
			var v1 = obj1[key];
			var v2 = obj2[key];
			if(trans==1){
				if (v1 < v2) {
					return 1;
				} else if (v1 > v2) {
					return -1;
				} else {
					return 0;
				}
			}else{
				if (v1 < v2) {
					return -1;
				} else if (v1 > v2) {
					return 1;
				} else {
					return 0;
				}
			}
		})
		return ndata;
	}
	
	// 给数组添加删除方法
	Array.prototype.remove = function(val) { 
		var index = this.indexOf(val); 
		if (index > -1) { 
			this.splice(index, 1); 
		} 
	};
	/**
     * 提示框
	 * 调用方法：common.prompt('提示内容',1000,function(){ console.log('执行的函数') })
     */
    common.prompt = function (text, time, fun) {
        if (!text) {
            return false;
        }
        if (!time) {
            time = 2000;
        }
        if (document.getElementById("popMessage") || document.getElementById("conFirm")) {
            return;
        }
        if (document.getElementById("popLoading")) {
            document.body.removeChild(document.getElementById("popLoading"));
        }
        var str = document.createElement("div");
        str.id = "popMessage";
        str.innerHTML = "<div id='mobileMessage'>" + text + "</div>";
        var bodyEle = document.getElementsByTagName("body")[0];
        bodyEle.appendChild(str);
        var popMes = document.getElementById("popMessage");
        var stylePopMes = "position:fixed;width:100%;height:100%;left:0;top:0;z-index:10000;";
        document.getElementById("mobileMessage").style.cssText = "height:auto;position:absolute;top:50%;left:50%;padding:15px 10px;border-radius:5px;background:none no-repeat center center rgba(0,0,0,.7);overflow:hidden;text-align:center;color:#fff;font-size:0.3rem;z-index:10001;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);transform:translate(-50%,-50%)";
        popMes.style.cssText = stylePopMes;
        var offMessage = function () {
            var str = document.getElementById("popMessage");
            if (str) {
                bodyEle.removeChild(str);
            }
            if (typeof(fun) == "function") {
                fun();
            } else {
                return false;
            }
            clearTimeout(sto);
        }
        var sto = setTimeout(offMessage, time);
    }
    common.add = function(){
        alert(11)
    }