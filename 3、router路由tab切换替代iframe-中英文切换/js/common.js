/**
 * 公共方法
 */
define(function(require, exports, module) {
	var dev = require("dev");
	var vue = new Vue()
	var common = {};
	/**
	 * ajax调用方法
	 *  common.ajax({
			url:'',
			type:'post',
			data:{},
		}).then(res => {
			console.log(res)
		})
	 */
    common.ajax = function(params){
        vue.$indicator.open()
		if (params) {
			return new Promise((resolve, reject) => {
				!params.data && (params.data = {})
				params.data['token'] = token
				$.ajax({
					type: params.type || 'post',
					url: dev.APIURL + params.url || null,
					dataType:'json',
					data: params.data || null,
					// 把token放头文件中

					headers: {
						'token':token,
						'identity':identity,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: function (res) {
						vue.$indicator.close()
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
			console.log(leftNum)
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

    module.exports = common;
});