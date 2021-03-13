import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 用vuex实现add,edit,del功能，解构写法{id,form}相当传arg
export default new Vuex.Store({
	strict: true,
	state: [
		{ id: 1, name: '衣服', price: 69.9, count: 5 },
		{ id: 2, name: '裤子', price: 29.9, count: 15 },
		{ id: 3, name: '鞋子', price: 19, count: 25 }
	],
	mutations: {
		//
		/**
         state是语法只传后半前半语法,form当前操作的
        当前编辑或删除的下标 state.findIndex(item => item.id == id)
        */
		add(state, form) {
			// 添加id,最后一个id+1
			if (!state.length) {
				//一个数据没有时
				form['id'] = 1;
			} else {
				form['id'] = state[state.length - 1].id + 1;
			}
			state.push(form);
		},
		edit(state, { id, form }) {
			//简写前
			// var idx = state.findIndex(function(item){
			//    if( item.id==id){
			//        return true;
			//    }
			// });
			// state[idx]=form;
			state[state.findIndex(item => item.id == id)] = form;
		},
		del(state, id) {
			state.splice(
				state.findIndex(item => item.id == id),
				1
			);
		}
	},
	actions: {
		// context参数里有很多对象有方法commit可解构出来add(context) 或add({commit})都可；actions名可与mutations名相同，
		add({ commit }, form) {
			commit('add', form);
		},
		edit({ commit }, { id, form }) {
			commit('edit', { id, form });
		},
		del({ commit }, id) {
			commit('del', id);
		}
	},
	// getters里的东西以变量形式用,不是以函数形式但可以模拟函数使用，return返回个函数就可以了，但不能返数字那样就11()调数字了
	// getters可以帮助重用
	// getters是专门帮助返回数据的，正常 store的所有的读都应该通过getters，只是有时偷赖没用
	// getters是用来读的不是写的，不要用它来写
	getters: {
		getDataById(state, id) {
			// return function(id) {
			// 	return state.find(item => item.id == id);
			// };
			// strict:true防止从mutations之外修改数据，加上Object.assign复制给新的json就不在原来上改了
			return id =>
				Object.assign(
					{},
					state.find(item => item.id == id)
				);
		}
	}
});
