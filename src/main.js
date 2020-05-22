import Vue from 'vue';
import blobUrl from '@/worker';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';

const webWorker = new Worker(blobUrl);
Vue.config.productionTip = false;
Vue.prototype.webWorker = webWorker;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
