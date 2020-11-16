var app = new Vue({
  el: '#app',
  data: {
    isWap: false,
    qusData: [
      {
        title: '1.	以下哪一个是捷达品牌的英文简称？JETTA',
        anwers: [
          { radios: 'A JATTA', id: 1 },
          { radios: 'B JA DDA', id: 2 },
          { radios: 'C JETTA', id: 3 }
        ]
      },
      {
        title: '2.	捷达品牌VS5是什么车型？SUV',
        anwers: [
          { radios: 'A 轿车', id: 1 },
          { radios: 'B SUV', id: 2 },
          { radios: 'C MPV', id: 3 }
        ]
      },
      {
        title: '3.	2020年捷达品牌在售车型有哪些？ VA3 VS5 VS7',
        anwers: [
          { radios: 'A VA3 VS5 VS7', id: 1 },
          { radios: 'B VH3 VS5 VS7', id: 2 },
          { radios: 'C VA5 VS3 VS7', id: 3 }
        ]
      }
      // {
      //   title: '4.	捷达品牌VS7整车质保范围是？3年或10万公里',
      //   anwers: [
      //     { radios: 'A ２年或10万公里', id: 1 },
      //     { radios: 'B 3年或10万公里', id: 2 },
      //     { radios: 'C 3年或５万公里', id: 3 }
      //   ]
      // },
      // {
      //   title: '5.	捷达品牌VS7市场指导价是？10.68万起',
      //   anwers: [
      //     { radios: 'A 10.68万起', id: 1 },
      //     { radios: 'B 11.68万起', id: 2 },
      //     { radios: 'C 12.68万起', id: 3 }
      //   ]
      // },
      // {
      //   title: '6.	捷达品牌VS5市场指导价是？8.48万起',
      //   anwers: [
      //     { radios: 'A 7.48万起', id: 1 },
      //     { radios: 'B 8.48万起', id: 2 },
      //     { radios: 'C 10.48万起', id: 3 }
      //   ]
      // },
      // {
      //   title: '7.	捷达品牌VS7有什么亮点？以上都是',
      //   anwers: [
      //     {
      //       radios:
      //         'A 大格局驾乘空间 SUV前后独立悬架系统 360度全景影像 手机无线充电',
      //       id: 1
      //     },
      //     {
      //       radios:
      //         'B ACC自适应巡航 FRONT ASSIST预碰撞安全系统 EPB电子手刹+AUTOHOLD自动驻车',
      //       id: 2
      //     },
      //     { radios: 'C 以上都是', id: 3 }
      //   ]
      // },
      // {
      //   title: '8.	捷达品牌VS7采用什么发动机？大众EA211 1.4Ｔ涡轮增压发动机',
      //   anwers: [
      //     { radios: 'A 大众EA211 1.4Ｔ涡轮增压发动机', id: 1 },
      //     { radios: 'B 奥迪IW100 1.6Ｔ', id: 2 },
      //     { radios: 'C 大众ＥＡ８８８　２.０Ｔ', id: 3 }
      //   ]
      // },
      // {
      //   title: '9.	捷达品牌VS５有什么亮点？以上都是',
      //   anwers: [
      //     {
      //       radios:
      //         'A ＨＳＢ高强度车身 6安全气囊 ESP电子稳定程序 大众MQB平台技术',
      //       id: 1
      //     },
      //     {
      //       radios:
      //         'B ＭＫＥ疲劳检测系统  车载互联  EA211 1.4T涡轮增压发动机 AQ250 6速手自一体变速器',
      //       id: 2
      //     },
      //     { radios: 'C 以上都是', id: 3 }
      //   ]
      // },
      // {
      //   title: '10.	捷达品牌VS7轴距是多少？２７３０ｍｍ',
      //   anwers: [
      //     { radios: 'A ２２３０ｍｍ', id: 1 },
      //     { radios: 'B ２７３０ｍｍ', id: 2 },
      //     { radios: 'C ２８８０ｍｍ', id: 3 }
      //   ]
      // },
      // {
      //   title: '11.	捷达品牌VS7油箱容积是多少？５１Ｌ',
      //   anwers: [
      //     { radios: 'A ５１Ｌ', id: 1 },
      //     { radios: 'B ５２Ｌ', id: 2 },
      //     { radios: 'C ４８Ｌ', id: 3 }
      //   ]
      // }
    ],
    //选择数据暂存
    cacheArr: [], //临时
    // 对象整理暂存
    temp: {
      serial: []
    },
    submitfrom: [], //答案选择
    // 答题时间内
    time: {
      timer: null,
      value: 6,
      is: true //是否60秒内
    },
    time2: {
      timer: null,
      value: 3,
      is: true //是否60秒内
    },
    // 是否有答题机会
    haveJihui: true,
    // 是否可提交
    canSubmit: true,
    pop: {
      isShow: false
      // isRuleShow: false
    }
  },
  created: function() {
    var _this = this;
    console.log(JSON.parse(JSON.stringify(_this.qusData)), 1);
  },
  methods: {
    gobackFn() {},
    //判断是否是移动设备打开
    Isweixin() {
      var _this = this;
      _this.timeFn();
      var userAgentInfo = navigator.userAgent.toLowerCase();
      var returnUrl = _this.chineseTransfer(location.href);
      if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
        _this.openid = methods.getQueryString('openid');
        if (!_this.openid) {
          location.href =
            '/Activity/NewCarTeam/wechatLogin?callbackurl=' + returnUrl;
        } else {
          console.log(_this.openid, '有openid');
        }
      }
    },
    // 转义
    chineseTransfer(value) {
      return encodeURIComponent(encodeURIComponent(value));
    },
    //网页
    wap() {
      var _this = this;
      _this.isWap = true;
    },
    radioChange(item, key) {
      var _this = this;
      // 传送格式
      let cache = {
        serial: key,
        option: item.id
      };
      _this.cacheArr.push(cache);
      // 选中id
      _this.temp.serial[key] = item.id;
      let otheritems = [];
      let list = {};
      for (let i = 0; i < _this.cacheArr.length; i++) {
        let index = _this.cacheArr[i].serial;
        list[index] = {};
        list[index].serial = _this.cacheArr[i].serial;
        list[index].option = _this.cacheArr[i].option;
      }
      for (let i in list) {
        otheritems.push(list[i]);
      }
      // 数据提交
      _this.submitfrom = otheritems;
      console.log(_this.temp.serial, '选中id');
      console.log(_this.zhuan(_this.submitfrom), '提交数据');
    },
    zhuan(par) {
      return JSON.parse(JSON.stringify(par));
    },
    submit() {
      var _this = this;
      if (_this.qusData.length != _this.submitfrom.length) {
        _this.canSubmit = false;
        _this.isHave = true;
        alert('请仔细阅读，不要漏选');
      } else {
        alert('能提交');
        _this.canSubmit = true;
        _this.isHave = false;
      }
      if (_this.isHave) {
        alert('有机会');
      } else {
        alert('没机会');
        _this.pop.isShow = true;
        _this.timeFn2();
      }
    },
    timeFn() {
      var _this = this;
      // 进入页面60S计时答题
      _this.time.timer = setInterval(() => {
        if (_this.time.value > 0) {
          _this.time.value -= 1;
          _this.time.is = true;
        } else {
          console.log(_this.time.value);
          _this.time.value = 0;
          clearInterval(_this.time.timer);
          console.log('时间到！');
          _this.time.is = false;
        }
        console.log(_this.time.is);
      }, 1000);
    },
    timeFn2() {
      var _this = this;
      // 进入页面60S计时答题
      _this.time2.value = 3;
      _this.time2.timer = setInterval(() => {
        if (_this.time2.value > 0) {
          _this.time2.value -= 1;
          _this.time2.is = true;
        } else {
          console.log(_this.time2.value);
          _this.time2.value = 0;
          clearInterval(_this.time2.timer);
          console.log('时间到2！');
          _this.time2.is = false;
          _this.pop.isShow = false;
        }
        console.log(_this.time2.is);
      }, 1000);
    }
  },
  mounted: function() {
    var _this = this;
    //网页中判断登录状态
    var userAgentInfo = navigator.userAgent.toLowerCase();
    if (userAgentInfo.match(/MicroMessenger/i) != 'micromessenger') {
      // _this.wap()
    } else {
      // _this.Isweixin();
    }
    _this.Isweixin();

    // 存放选择id
    for (var i = 0; i < _this.qusData.length; i++) {
      _this.temp.serial.push('');
    }
  }
});
