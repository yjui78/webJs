import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

let store=new Vuex.Store({
  state: {
    playList: [],
  },
  mutations: {
    addToList(state, payload){
      if(!state.playList.find(item=>item==payload)){
        state.playList.push(payload);
      }else{
        alert('此歌曲已存在');
      }
    },
    removeFromList(state, payload){
      state.playList=state.playList.filter(item=>item!=payload);
    }
  }
});

export default store;
