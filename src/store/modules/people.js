import axios from 'axios';

export default {
  namespaced: true,
  state: {
    selected: null,
    list: [],
    isLoading: false,
    lastError: false,
  },
  getters: {
    selectedBalance(state, getters, rootState, rootGetters) {
      return state.selected.worth - rootGetters['cart/cartTotal'];
    },
  },
  actions: {
    async fetch({ commit }) {
      commit('setLoading', true);
      try {
        const { data } = await axios.get('/assets/json/people.json');

        commit('setList', data);
      } catch (error) {
        commit('setLastError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    setSelected({ commit }, person) {
      commit('setSelected', person);
    },
  },
  mutations: {
    setSelected(state, payload) {
      state.selected = payload;
    },
    setList(state, payload) {
      state.list = payload.map((p) => {
        const worth = Number(p.worth.replaceAll(' ', ''));
        return { ...p, worth };
      });
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setLastError(state, payload) {
      state.lastError = payload;
    },
  },
};
