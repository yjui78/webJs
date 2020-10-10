
var vm = new Vue({
    el: '#app',
    data: {
        a: 1595469353094,    //ts时间戳
        price: 21000,
        text: 'yjui',
        number: 2.543216,
        txt1: 'yjui',
        text2: '【环球时报记者 李强】自9月18日，东部战区新闻发言人宣布解放军在台海有重大行动以来，解放军海空兵力在台湾海峡进行的战备警巡和海空联合演练行动牵动着台湾方面的敏感神经，令岛内高度紧张。据台湾媒体报道，近日进入台湾海峡空域巡航的解放军军机为歼-10、歼-11、歼-16等型号，歼-16战斗机还对台军IDF进行“包夹”。那么，解放军为什么派出上述机型活动？歼-20为何没有现身海峡？美国在附近空域出现的侦察机能否对解放军战机构成威胁呢？',
        text3: 'yjui',
        phone: 15245166180,
        cardNo: 230225198912132343,
        number2: 3.3422323,
        shuru: 3.54676,
        zero: 2.1,
        time: 1595469353094,
        now: new Date(),
    },

    created() {
        var _this = this;
    },
    methods: {
        numFormat: function (num) {
            var b = parseFloat(num).toString();
            if (!isNaN(b)) {
                return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
                    return $1 + ",";
                });
            }
        },

        pluralize(time, label) {
            return time + label + '前'
        },

    },
    filters: {
        // 时间格式转换
        time2str(ts) {

            let oDate = new Date(ts);
            return oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate();
        },
        // 千位分隔符21,000
        formatNumber: function (n) {
            var b = parseInt(n).toString();
            var len = b.length;
            if (len <= 3) {
                return b;
            }
            var r = len % 3;
            return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
        },
        // 转成以万为单位表示5.2万
        toCurrcney: function (value) {
            if (!value) {
                return "-";
            }
            else if (!parseFloat(value)) {
                return value
            }
            else {
                return (parseFloat(value) / 10000).toFixed(2);
            }
        },
        // 转成大写
        Upper: function (value) {
            return value.toUpperCase()
        },
        // 保留小数，不限定位数
        numFormat: function (num) {
            var b = parseFloat(num).toString();
            if (!isNaN(b)) {
                return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
                    return $1 + ",";
                });
            }
        },
        // 千位分隔+分隔点
        thousand: function (num) {
            num = String(Number(num).toFixed(2));
            var re = /(-?\d+)(\d{3})/;
            while (re.test(num)) {
                num = num.replace(re, "$1,$2");
            }
            return num;
        },
        /*
        * HTML编译输出过滤器
        */
        // 文字溢出过滤器， length文字长度
        textOverflow: function (text, length) {
            const _length = length || text.length
            const cansub = _length && text && (text.length) > _length
            return cansub ? (text.substr(0, _length) + '...') : text
        },
        // 首字母大写
        firstUpperCase: function (str) {
            return str ? str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) : str
        },
        // 隐藏部分手机号
        hidePhone: function (phoneNum) {
            phoneNum = phoneNum || ''
            if (phoneNum) {
                phoneNum = phoneNum.toString().replace(/\s*/g, '')
                return phoneNum === '' ? '' : phoneNum.replace(/(\d{3})\d{1,4}(\d{4})/g, '$1****$2')
            } else {
                return ''
            }
        },
        // 隐藏部分身份证号 530****350 15-18
        hideIdNo: function (cardNo) {
            cardNo = cardNo.toString().replace(/\s*/g, '')
            return cardNo === '' ? '' : cardNo.replace(/(\d{3})\d{9,12}(\d{3})/, '$1****$2')
        },
        /**
         * 金额格式化   金额 用逗号 隔开 数字格式化
         * @param s - 金额
         * @param n - 小数位数 默认为保留两位小数
         */
        fMoney: function (s, n = 2) {
            s = s || ''
            if (isNaN(s)) return '0.00'
            if (s === '' || s === 0) return '0.00'
            let flag = ''
            if (s < 0) {
                flag = '-'
                s = s.toString().split('-')[1]
            }

            n = (n > 0 && n <= 20) ? n : 2
            // eslint-disable-next-line no-useless-escape
            s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''

            let [l, r, t] = [s.split('.')[0].split('').reverse(), s.split('.')[1], '']
            if (!r) return s + '.00'
            for (let i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
            }
            return flag + t.split('').reverse().join('') + '.' + r
        },
        // 四舍五入 保留两位小数
        floorTwo: function (s) {
            if (isNaN(s)) {
                s = 0
            }
            if (Number(s) < 0) {
                s = 0
            }
            // return Math.floor(s * 100) / 100
            return Math.round(s * 100) / 100
        },
        // 补零 保留两位小数//没啥用
        addZero: function (s) {
            if (isNaN(Number(s))) {
                return 0
            }
            return Number(s).toFixed(2)
        },
        /*
        * 时间格式化过滤器
        */
        // 转换为本地时间格式
        toLocalString: function (date) {
            return date ? new Date(date).toLocaleString() : date
        },
        // YMDHMS时间转换过滤器
        toYMD: function (date) {
            if (!date) return date
            date = new Date(date)
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours() > 11 ? '下午' : '上午'}`
        },
        // YMD时间转换过滤器
        toTime: function (date) {
            if (!date) return date
            date = new Date(date)
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        },
        // YMD时间转换过滤器
        toMonth: function (date) {
            if (!date) return date
            date = new Date(date)
            return `${date.getFullYear()}/${date.getMonth() + 1}`
        },
        // YMDHMS时间转换过滤器
        toYMDHMS: function (date) {
            function change(f) {
                return f < 10 ? '0' + f : f
            }
            if (!date) return date
            date = new Date(date)
            let [y, m, d, hh, mm, ss] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
            return `${y}-${change(m)}-${change(d)} ${change(hh)}:${change(mm)}:${change(ss)}`
        }







    },
    computed: {
        // 相对时间过滤器，传入时间，返回距离今天有多久
        // 因为在filters中this不是Vue不能用methods中的方法pluralize,所以放computed中
        timeAgo() {
            console.log(this.time, 1)
            time = this.time instanceof Date ? this.time : new Date(this.time)
            const between = Date.now() / 1000 - (Number(time) / 1000)
            if (between < 3600) {
                if (Object.is(~~(between / 60), 0)) return '刚刚'
                return this.pluralize(~~(between / 60), ' 分钟')
            } else if (between < 86400) {
                return this.pluralize(~~(between / 3600), ' 小时')
            } else {
                return this.pluralize(~~(between / 86400), ' 天')
            }
        }
    }
})