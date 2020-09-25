(function(vue){
   var template = `<div>
   <div style="background:#efefef;height:50px;line-height:50px;text-align:center;width:100%;">
   <button @click="clk">点击</button>这是head{{aa}}</div></div>`
    //head组件名
   var head = vue.extend({
       template:template,
       props:['aa'],
       data(){
           return {}
       },
       created(){
       },
       methods:{
            clk(){
                alert(1)
            }
       },

   })
    //vue上放header  
   vue.header = head;
})(Vue)