

var url1 = location.href;
if (url1.indexOf('chinese') == -1) {
    var host = 'http://39.97.180.149:83/zh/fastadmin/public/'; //域名
    var host1 = 'http://39.97.180.149:83/zh/fastadmin/public/'; //图片
} else {
    var host = 'http://39.97.180.149:83/en/fastadmin/public/'; //域名
    var host1 = 'http://39.97.180.149:83/en/fastadmin/public/'; //图片
}

var app = new Vue({
    el: "#app",
    data: {
        List: {
            biaotou: '',
            cankaowenxian: '',
            img: '',
            related_products: '',
            zonglan: '',
            chanwu: '',
            relevant_product_content: '',
            yingyonglinyu: '',
            gongneng: '',
            imagecontent: '',
            chanpichicuns: '',
            guanlianchanpi: '',
            imge_content: '',
            lianxiwomen: '',
            succedaneum: '',
            tupian: '',
            yingyonglinyu: '',
            zonglan: '',

        },
        replyIndex: 0, //评价平均数
        zjllList: [], //最近浏览
        cartemp: [], //临时规格
        pjList: [], //评论列表
        lbtIndex: 0,
        showIs: [
            { show: true },
            { show: true },
            { show: false },
            { show: true },
            { show: true },
            { show: true },
            { show: true },
            { show: true },
            { show: true },
            { show: true },
        ],
        uploadImg: [],
        imgSrc: [], //图片路径
        imgFile: [], //文件流
        imgName: [], //图片名字
        returnimgs: [],
    },
    created: function () {
        var _this = this;
        $.get(`${host}api/product/getProductValue?product_id=${$.getUrlParam('id')}`, (res) => {
            if (res.code == 1) {
                // 	console.log(res)
                res.data.related_products.forEach((item, index) => {
                    if (index == 0) {
                        item.show = true;
                    } else {
                        item.show = false;
                    }
                })
                _this.List = res.data;
                setInterval(() => {
                    this.lbtIndex = this.lbtIndex + 1;
                }, 4000);
            }
        })
        // 最近浏览
        $.post(`${host}api/product/getBrowseList`, {
            users_id: USERID,
        },
            (res) => {
                if (res.code) {
                    this.zjllList = res.data;
                    console.log()
                }
            });
        // 浏览商品
        $.post(`${host}api/Product/addBrowse`, {
            users_id: USERID,
            cases_id: $.getUrlParam('id'),
        },
            (res) => {
                // {
                if (res.code == 1) {
                    console.log('浏览商品成功');
                } else {
                    // layer.msg(res.msg);
                    return 0;
                }
            });

        //获取url参数
        var url1 = window.location.href;
        var dz_url = url1.split('#')[0];
        var cs = dz_url.split('?')[1];
        var cs_arr = cs.split('&');
        var cs = {};

        for (var i = 0; i < cs_arr.length; i++) {
            cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1];
        }
        this.pages = cs.pages;
        this.rows = cs.rows;

        if (this.pages == undefined) {
            this.pages = 0;
        }
        if (this.rows == undefined) {
            this.rows = 0;
        }
        $.get(`${host}api/Productreply/replyList?id=${$.getUrlParam('id')}&page=` + this.pages + `&rows=` + this.rows, (res) => {
            // 			$.get(`${host}api/Productreply/replyList?id=${$.getUrlParam('id')}&page=`+this.pages
            // 			+`&rows=`+this.rows, (res) => {
            // {
            this.pjList = res.data;
            let a = 0;
            res.data.forEach((item, index) => {
                a = a + eval(item.stars);
            })

            this.replyIndex = a / res.data.length;
        })
    },
    methods: {
        // 点击取反
        showTap(index) {
            this.showIs[index].show = !this.showIs[index].show;
        },
        // 清除记录
        claearView() {
            $.get(`${host}api/product/clearBrowseValue?users_id=${USERID}`, res => {
                if (res.code) {
                    this.zjllList = [];
                } else {
                    // layer.alert(res.msg)
                }
            })
        },
        // 加入购物篮
        joinCar() {
            if (this.cartemp.length == 0) {
                layer.msg('请选择规格');
                return false;
            }
            if (!USERID) {
                layer.msg('请登录后再试');
                return false;
            }
            $.post(`${host}api/cat/addCat`, {
                user_id: USERID,
                product_id: this.cartemp[0],
                num: 1,
                size: this.cartemp[4],
                price: this.cartemp[1],
                type_id: 1,
            },
                (res) => {
                    if (res.code == 0) {
                        layer.alert(res.msg);
                        return false;
                    } else {
                        layer.alert(res.msg);
                    }
                });
            // 购物车数量
            $.post(`${host}api/Cat/catCount`, {
                user_id: USERID,
            }, (res) => {
                console.log('购物车数量' + res.data)
                if (res.code == 1) {
                    $('#carNum').html(res.data)
                }
            });
        },
        // 添加到询价
        joinInquire() {
            if (!USERID) {
                layer.msg('请登录后再试');
                return false;
            }
            if (this.cartemp.length == 0) {
                layer.msg('请选择规格');
                return false;
            }

            $.get(`${host}api/Inquiry/Inquiry?data=[{"product_name":"${this.List.biaotou.product_name}","num":"1","size":"${this.cartemp[2]}"}]&user_id=${USERID}`).then(res => {
                if (res.code) {
                    layer.msg(res.msg)
                } else {
                    layer.msg(res.msg)
                }
            })
        },

        querens() {
            //获取url参数
            var url1 = window.location.href;
            var dz_url = url1.split('#')[0];
            var cs = dz_url.split('?')[1];
            var cs_arr = cs.split('&');
            var cs = {};
            var formData = 1;

            for (var i = 0; i < cs_arr.length; i++) {
                cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1];
            }
            var proid = cs.id;

            var content = $('#pltext').val();
            //  console.log(1456);
            if (USERID == '') {
                if (confirm('请先去登录')) {
                    window.location.href = "/chinese/login.html";
                }
            } else {
                $.post(`${host}api/Productreply/addpinglun`, {
                    user_id: USERID, content: content, productid: proid, file: formData
                    //  file:formData
                }, (res) => {
                    if (res.code == 0) {
                        layer.alert(res.msg);
                        // 			alert(res.msg);
                        // 			this.reload();
                        window.location.href = "/chinese/details.html?id=" + proid;

                        // 			console.log(112345)
                    } else {
                        layer.alert(res.msg);
                        return false;
                    }

                });
            }

        },
        // 点击规格
        carTempTap(item) {
            this.cartemp = item;
        },
        // 选择
        checkTap(item) {
            console.log(item)
        },
        joinSimCar() {
            var _this = this;
            // console.log(this.List.related_products);
            // return 0;
            if (!USERID) {
                layer.alert('请登录后再试');
                return 0;
            }
            let m = [];
            console.log(_this.List.related_products, 3)
            _this.List.related_products.forEach((item, index) => {
                if (item.show) {

                    item.cases_id = item.id;
                    item.price = item.price1;
                    item.user_id = USERID;
                    item.num = 1;
                    item.size = item.size;
                    delete item.size1;
                    delete item.price1;
                    delete item.product_overview;
                    delete item.product_name;
                    delete item.figure1_image;
                    delete item.cat1;
                    delete item.id;
                    delete item.show;

                    m.push(item);

                }
            })
            // 购物车数量
            $.get(host + 'api/cat/addCat_related_products?data=' + JSON.stringify(m), res => {
                // console.log('添加购物车')
                if (res.code == 1) {
                    // console.log(res)
                    layer.msg(res.msg)
                } else {
                    layer.msg(res.msg)

                }
            });
            // 购物车数量
            $.post(`${host}api/Cat/catCount`, {
                user_id: USERID,
            }, (res) => {
                console.log('购物车数量' + res.data)
                if (res.code == 1) {
                    $('#carNum').html(res.data)
                }
            });

        },
        // 数据表下载
        downloadTap() {
            // download(`${host1}${this.List.biaotou.product_pdf}`,'application/pdf','name.pdf');
            window.open(`${host1}${this.List.biaotou.product_pdf}`)
        },


        //图片预览路径
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        //图片展示
        addNewContent(obj) {
            var _this = this;
            $('#gallery').html("");
            for (var a = 0; a < _this.imgSrc.length; a++) {
                var oldBox = $(obj).html();
                // $(obj).html(oldBox + '<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
                $(obj).html(oldBox + '<div class="img-item" data-index="' + a + '" style="display: inline-block;"><span class="delete"   onclick="removeImg(this,' + a + ')"  data-filename="' + _this.imgName[a] + '">x</span><img title=' + _this.imgName[a] + ' alt=' + _this.imgName[a] + ' src=' + _this.imgSrc[a] + ' class="img"></div>');

            }
        },
        removeImg(obj, index) {
            alert(2)
            // var _this = this;
            // _this.imgSrc.splice(index, 1);
            // _this.imgFile.splice(index, 1);
            // _this.imgName.splice(index, 1);
            // var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
            // _this.addNewContent(boxId);
        },
        flatten(arr) {
            var _this = this;
            var res = [];
            for (var i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    res = res.concat(_this.flatten(arr[i]));
                } else {
                    res.push(arr[i]);
                }
            }
            return res;
        }
    },

    watch: {
        lbtIndex() {

            if (this.lbtIndex > this.List.img.length - 1) {
                this.lbtIndex = 0
            }
            if (this.lbtIndex < 0) {
                this.lbtIndex = this.List.img.length - 1
            }
        }
    },
    computed: {
        glcp() {
            var _this = this;
            let money = 0;
            console.log(_this.List.related_products, 5)
            // _this.List.related_products.forEach((item, index) => {
            //     if (item.show) {
            //         money = eval(item.price1) + money;
            //     }
            // })
            for (var i = 0; i < _this.List.related_products.length; i++) {
                if (_this.List.related_products[i].show) {
                    money = eval(_this.List.related_products[i].price1) + money;
                }
            }
            return money
        }
    },
    //mounted 里所有都是图片上传
    mounted: function () {
        var _this = this;
        //图片上传
        var files = [];
        var that = this;
        var flag = -1;
        $("#upload").click(function () {
            $("#file").trigger("click");
        })
        $("#file").change(function () {
            var img = document.getElementById("file").files;
            var div = document.createElement("div");
            for (var i = 0; i < img.length; i++) {
                var file = img[i];
                var url = URL.createObjectURL(file);
                var box = document.createElement("img");
                var imgBox = document.createElement("div");
                var deleteIcon = document.createElement("span");
                box.setAttribute("src", url);
                box.className = 'img';

                imgBox.style.display = 'inline-block';
                imgBox.className = 'img-item';

                deleteIcon.className = 'delete';
                deleteIcon.innerText = '删除';
                deleteIcon.dataset.filename = img[i].name;
                flag++;
                imgBox.dataset.index = flag;

                imgBox.appendChild(deleteIcon);
                imgBox.appendChild(box);
                document.getElementById("gallery").appendChild(imgBox);
                that.files = img;
                $(deleteIcon).click(function () {
                    var filename = $(this).data("filename");
                    var deleteIndex = $(this).parent().data('index');
                    // 索引对应对象索引
                    var selfImg = _this.uploadImg;
                    var arr1 = [];
                    for (var y = 0; y < selfImg.length; y++) {
                        var obj1 = {};
                        if (selfImg[y].index == deleteIndex) {
                        } else {
                            obj1.index = selfImg[y].index;
                            obj1.thumb = selfImg[y].thumb;
                            arr1.push(obj1);
                        }
                    }
                    _this.uploadImg = arr1;
                    $(this).parent().remove();
                    var fileList = Array.from(that.files);

                    for (var j = 0; j < fileList.length; j++) {
                        if (fileList[j].name = filename) {
                            fileList.splice(j, 1);
                            break;
                        }
                    }
                    that.files = fileList
                    console.log('--------uploadImg-------');
                    console.log(_this.uploadImg);
                })
                /* 接口1：图片上传接口接收参数file: (binary) 二进制的形式，file接收的是本地图片地址，
                返回带有域名可访问的正确图片地址，
                接口2：最后提交接口，后台需要传参，图片以逗号形式传
                */
                var obj = {};
                if (img) {
                    var files = that.files;
                    var uploadFile = new FormData($("#formdata")[0]);
                    for (var i = 0; i < files.length; i++) {
                        uploadFile.append('files[]', files[i]);
                    }
                    if ("undefined" != typeof (uploadFile) && uploadFile != null && uploadFile != "") {
                        $.ajax({
                            url: `${host1}api/Productreply/upload`,
                            type: 'POST',
                            data: uploadFile,
                            async: false,
                            cache: false,
                            contentType: false, //不设置内容类型
                            processData: false, //不处理数据
                            success: function (res) {
                                console.log('-----------------' + res)
                                console.log(uploadFile)
                                obj.index = flag;
                                obj.thumb = res.data;
                                _this.uploadImg.push(obj);
                            },
                            error: function () {
                                alert("上传失败！");
                            }
                        })

                    } else { }
                }
                console.log(JSON.parse(JSON.stringify(_this.uploadImg)), '这是最后展示的图片返回')
            }
        })
    }
})