import Vue from 'vue';
import Vuex from 'vuex';
import Vue2Filters from 'vue2-filters';
import App from './App.vue';
import store from './store/index';

Vue.use(Vuex);
Vue.use(Vue2Filters);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
