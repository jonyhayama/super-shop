import Vuex from 'vuex';
import Vue from 'vue';
import products from './modules/products';
import people from './modules/people';
import cart from './modules/cart';

Vue.use(Vuex);

Vue.filter('short-currency', (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
});

export default new Vuex.Store({
  modules: {
    products,
    people,
    cart,
  },
});
