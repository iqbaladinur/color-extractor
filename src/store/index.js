import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topColors: [],
    isExtracting: false,
    imgSource: null,
    isFetchingImg: false,
    imgDomObject: null,
  },
  mutations: {
    setTopColors: (state, payload) => {
      state.topColors = payload;
    },
    toggleExtraction: (state) => {
      state.isExtracting = !state.isExtracting;
    },
    setImageSource: (state, imgSource) => {
      state.imgSource = imgSource;
    },
    toggleIsFetchingImg: (state) => {
      state.isFetchingImg = !state.isFetchingImg;
    },
    setImgDomObject: (state, domObjct) => {
      state.imgDomObject = domObjct;
    },
  },
  actions: {
    setTopColors: (context, payload) => {
      context.commit('setTopColors', payload);
    },
    toggleExtraction: (context) => {
      context.commit('toggleExtraction');
    },
    setImageSource: (context, imgSource) => {
      context.commit('setImageSource', imgSource);
    },
    toggleIsFetchingImg: (context) => {
      context.commit('toggleIsFetchingImg');
    },
    setImgDomObject: (context, domObjct) => {
      context.commit('setImgDomObject', domObjct);
    },
  },
  getters: {
    getTopColors: (state) => state.topColors,
    getExtractionStatus: (state) => state.isExtracting,
    getImgSource: (state) => state.imgSource,
    getFetchingImgStatus: (state) => state.isFetchingImg,
    getImgDomObject: (state) => state.imgDomObject,
  },
  modules: {
  },
});
