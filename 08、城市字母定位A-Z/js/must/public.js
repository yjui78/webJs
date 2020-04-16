
    var ajaxUrl =" https://mall.faw-vw.com" 
    // https://mall.faw-vw.com/index.php/usedcar/city/ProvincialCity
    var timeOut;

    var methods = {
       init:(function(){
            $("body").append('<div class="prompt"></div>');
       })(),
       
        //全站ajax请求状态处理
        ajax: function (url, data, successCallback, errorCallback) {
            var token = localStorage.getItem('token')||'';
            var identity = localStorage.getItem('identity')||'';
            $.ajax({
                "type": "POST",
                "url": ajaxUrl + url,
                "async": true,
                "data": data,
                "success": function (res) {
                    //返回状态处理
                    if (res.code == 200) {
                        if (res.data == null || res.data == 'null') {
                            if (errorCallback) {
                                errorCallback(res)
                            } else {
                                methods.prompt(res.msg);
                            }
                        } else {
                           
                            if (successCallback) {
                                successCallback(res);
                            }
                        }
                    }
                    else {
                        if (errorCallback) {
                            errorCallback(res)
                        } else {
                            methods.prompt(res.msg);
                        }
                    }
                }
            });
        },
        //提示框
        prompt: function (con, back) {
            $(".prompt").html(con ? con : "").show();
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                $(".prompt").hide();
                if (back) back();
            }, 2000);
        },
        //获取浏览器url参数
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        //验证手机号
        phoneVerify: function (phone) {
            if (/^1\d{10}$/.test(phone)) {
                return true;
            } else {
                return false;
            }
        },
    };
