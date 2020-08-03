import Vue from 'vue';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';

if (process.env.NODE_ENV) {
  Vue.use(VueGtag, {
    config: { id: 'UA-169647352-4' },
  });
}

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
