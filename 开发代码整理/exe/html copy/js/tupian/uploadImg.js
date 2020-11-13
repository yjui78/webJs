var imgSrc = []; //图片路径
var imgFile = []; //文件流
var imgName = []; //图片名字
//选择图片
function imgUpload(obj) {
	var oInput = '#' + obj.inputId;
	var imgBox = '#' + obj.imgBox;
	var btn = '#' + obj.buttonId;

	// $(oInput).on("change", function () {
	$(oInput).change(function () {
		var fileImg = $(oInput)[0];
		for (var i = 0; i < fileList.length; i++) {
			var imgSrcI = getObjectURL(fileList[i]);
			imgName.push(fileList[i].name);
			imgSrc.push(imgSrcI);
			imgFile.push(fileList[i]);
		}
		addNewContent(imgBox);
		console.log(imgBox, 4)


	})
	$(btn).on('click', function () {
		console.log("btn", btn)
		var data = new Object;
		data[obj.data] = imgFile;
		console.log(data, 999)
		submitPicture(data);
	})
}
//图片展示
function addNewContent(obj) {
	$(imgBox).html("");
	for (var a = 0; a < imgSrc.length; a++) {
		var oldBox = $(obj).html();
		$(obj).html(oldBox + '<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
	}
}
//删除
function removeImg(obj, index) {
	imgSrc.splice(index, 1);
	imgFile.splice(index, 1);
	imgName.splice(index, 1);
	var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
	addNewContent(boxId);
}
//上传(将文件流数组传到后台)
function submitPicture(data) {
	var fileInput = document.getElementById("file");
	var fileList = fileImg.files;
	var file = fileInput.files[0];
	//FileReader可直接将上传文件转化为二进制流
	var reader = new FileReader();
	reader.readAsDataURL(file);//转化二进制流，异步方法
	reader.onload = function () {//完成后this.result为二进制流
		// console.log(this.result);

		var base64Str = this.result;
		var startNum = base64Str.indexOf("base64,");
		startNum = startNum * 1 + 7;
		//去除前部格式信息（如果有需求）
		var baseStr = base64Str.slice(startNum);
		console.log(baseStr)
		//图片上传


		if (data) {
			$.ajax({
				type: "post",
				url: `${host1}api/Productreply/upload`,
				async: true,
				data: data,
				traditional: true,
				success: function (dat) {
					console.log(dat);

				}
			});
			// }
			// $.post(`${host1}api/Productreply/upload`, {
			// 	data: USERID,
			// }, (res) => {
			// 	console.log('购物车数量' + res.data)
			// 	if (res.code == 1) {
			// 		$('#carNum').html(res.data)
			// 	}
			// });
		}
	}
	//图片灯箱
	function imgDisplay(obj) {
		var src = $(obj).attr("src");
		var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
		$('body').append(imgHtml);
	}
	//关闭
	function closePicture(obj) {
		$(obj).parent("div").remove();
	}

	//图片预览路径
	function getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}