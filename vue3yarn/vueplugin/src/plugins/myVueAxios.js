export default {
    install(Vue,options){
        Vue.prototype.$axios = options;
    }
}