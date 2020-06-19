import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topColors: [],
    isExtracting: false,
  },
  mutations: {
    setTopColors: (state, payload) => {
      state.topColors = payload;
    },
    toggleExtraction: (state) => {
      state.isExtracting = !state.isExtracting;
    },
  },
  actions: {
    setTopColors: (context, payload) => {
      context.commit('setTopColors', payload);
    },
    toggleExtraction: (context) => {
      context.commit('toggleExtraction');
    },
  },
  getters: {
    getTopColors: (state) => state.topColors,
    getExtractionStatus: (state) => state.isExtracting,
  },
  modules: {
  },
});
