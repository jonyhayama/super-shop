import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: [],
    isLoading: false,
    lastError: false,
  },
  getters: {
    productsCount(state) {
      return state.list.length;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      try {
        const response = await axios.get('assets/json/products.json');
        commit('setProducts', response.data);
      } catch (error) {
        commit('setLastError', error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.list = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setLastError(state, payload) {
      state.lastError = payload;
    },
  },
};
