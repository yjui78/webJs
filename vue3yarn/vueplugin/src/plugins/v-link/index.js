export default {
    install(Vue){
        Vue.directive('link',{
            bind(el,binding,vNode){
                el.addEventListener('click',function(){
                   if(vNode.context.$router){
                       vNode.context.$router.push(binding.value);
                   }
                },false)
            }
        })
    }
}