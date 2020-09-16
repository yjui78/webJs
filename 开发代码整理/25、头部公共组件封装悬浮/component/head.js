(function(vue){
    var template = `
    <div style="position: absolute;z-index: 10;top: 0;left: 0;width: 100%;background: rgb(189, 216, 210);">
        <div style="overflow: hidden">
            <div style="float: left;">
                <img style="padding-top: 0.5rem;padding-bottom: 0.5rem;padding-right: 0.5rem;padding-left: 0.74rem;width: 0.211rem;background-size:100%;"
                src="./component/images/back_1.png" @click="toBack" alt="">
                <img style="padding-top: 0.5rem;padding-bottom: 0.5rem;padding-right: 0.5rem;width:0.46rem;background-size:100%;"
                src="./component/images/shouye_1.png" @click="toIndex">
                <img style="padding-top: 0.5rem;padding-bottom: 0.5rem;padding-right: 0.5rem;width:0.4rem;backgrond-size:100%;"
                src="./component/images/person_1.png" @click="toCenter">
            </div>
            <span @click="toDiy" style="float: right;margin-top: 0.33rem;margin-right: 0.8rem;text-align: center;font-size: 0.3rem;line-height:0.82rem;display: inline-block;height: 0.82rem;width: 2.5rem;border-radius: 0.41rem;background: #3eb2f3;color: #fff">
                {{text}}
            </span>
            <img class="coll" style="float: right;padding: 0.55rem 0.8rem 0;width:0.44rem;bacgground-size:100%;"
            src="./component/images/not.png" @click="collection" alt="">
        </div>
    </div>`
    var head = vue.extend({
        template:template,
        data:function(){
            //不使用return包裹的数据会在项目的全局可见，会造成变量污染；
            //使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件
            text:"这是一个文本";
            return {
                text:'钮按'
            }
        },
        //用props调用方法msg值就是curCar<vue-head :msg="curCar"></vue-head>
        props:['msg','num'],
        created:function(){
            var self = this;
            console.log(self.msg)
        },
        methods:{
            toDiy(){
                
            },
            toBack(){
                alert('返回')
            },
            toIndex(){
                alert('首页')
            },
            toCenter(){
                alert('个人中心')
            },
            collection(){
                alert('收藏')
            }
        }
    })
    vue.head= head;
})(Vue)