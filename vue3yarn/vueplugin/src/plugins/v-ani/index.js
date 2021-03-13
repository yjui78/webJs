export default {
    install(Vue){
      Vue.directive('ani',{
          bind(el,binding){
            let duration = 700;
            if(binding.value){// binding.value参数
            console.log(binding.value,1)
               if(typeof binding.value =='number'){
                duration =binding.value;
                console.log('number')
               }else if(typeof binding.value == 'object'){
                   duration = binding.value.duration;
                   console.log('object')
               }
            }
            console.log(duration)
            el.style.transition = `${duration}ms all ease`
          }
      })
    }
}