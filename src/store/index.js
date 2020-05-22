import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topColors: [],
  },
  mutations: {
    setTopColors: (state, payload) => {
      state.topColors = payload;
    },
  },
  actions: {
    setTopColors: (context, payload) => {
      context.commit('setTopColors', payload);
    },
  },
  getters: {
    getTopColors: (state) => state.topColors,
  },
  modules: {
  },
});
