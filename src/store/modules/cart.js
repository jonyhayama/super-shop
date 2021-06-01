export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map((item) => {
        const product = rootState.products.list.find((p) => p.id === item.id);
        return {
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        };
      }).sort((a, b) => Math.sign(a.price - b.price));
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    },
    getProductQuantity: (state) => (id) => {
      const cartItem = state.items.find((item) => item.id === id);
      return (cartItem) ? cartItem.quantity : 0;
    },
    isEmpty(state) {
      return state.items.length === 0;
    },
  },
  actions: {
    addProductToCart({ commit, state }, product) {
      const cartItem = state.items.find((item) => item.id === product.id);
      if (!cartItem) {
        commit('setProductQuantity', { id: product.id, quantity: 1 });
      } else {
        commit('incrementItemQuantity', cartItem);
      }
    },
    remProductFromCart({ commit, state }, product) {
      const cartItem = state.items.find((item) => item.id === product.id);
      if (cartItem) {
        if (cartItem.quantity === 1) {
          commit('removeProductFromCart', cartItem.id);
        } else {
          commit('decrementItemQuantity', cartItem);
        }
      }
    },
    setProductQuantity({ commit, state }, payload) {
      const { product, quantity } = payload;
      const cartItem = state.items.find((item) => item.id === product.id);
      if (Number(quantity) <= 0) {
        if (cartItem) {
          commit('removeProductFromCart', cartItem.id);
        }
      } else {
        commit('setProductQuantity', { id: product.id, quantity });
      }
    },
    clear({ commit }) {
      commit('clear');
    },
  },
  mutations: {
    setProductQuantity(state, payload) {
      const { id } = payload;
      const quantity = Number(payload.quantity);
      const cartItem = state.items.find((item) => item.id === id);
      if (!cartItem) {
        state.items.push({ id, quantity });
      } else {
        Object.assign(cartItem, { quantity });
      }
    },
    removeProductFromCart(state, payload) {
      state.items = state.items.filter((item) => item.id !== payload);
    },
    incrementItemQuantity(state, payload) {
      state.items.find((p) => p.id === payload.id).quantity += 1;
    },
    decrementItemQuantity(state, payload) {
      state.items.find((p) => p.id === payload.id).quantity -= 1;
    },
    clear(state) {
      state.items = [];
    },
  },
};
