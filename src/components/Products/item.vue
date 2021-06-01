<template>
  <div class="product">
    <a v-if="product.ext" :href="product.ext" target="_blank" class="product-info-link">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-info-circle fa-w-16 fa-2x __web-inspector-hide-shortcut__"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" class=""></path></svg>
    </a>
    <img :src="product.image" class="product-image" :class="{ 'rounded': product.rounded }" />
    <div class="info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p v-if="product.description" class="product-description">{{ product.description }}</p>
      <p v-if="product.price > 100000">${{ product.price | short-currency }}</p>
      <p v-else>{{ product.price | currency }}</p>
    </div>
    <div class="actions">
      <button
        @click="remProductFromCart(product)"
        class="button sell"
        :class="{ disabled: quantity === 0 }"
      >
        SELL
      </button>
      <input type="number" step="1" v-model="quantity" class="quantity-input" />
      <button
        @click="addProductToCart(product)"
        class="button buy"
        :class="{ disabled: !hasBalanceFor(product, 1) }"
      >
        BUY
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        title: 'loading...',
      }),
    },
  },
  watch: {
    quantity(newVal) {
      if (!this.hasBalanceFor(this.product, newVal)) {
        this.quantity = Math.floor(this.balance / this.product.price) + this.quantity;
      }
    },
  },
  computed: {
    ...mapGetters('cart', {
      cartTotal: 'cartTotal',
    }),
    ...mapGetters('people', {
      balance: 'selectedBalance',
    }),
    quantity: {
      get() {
        return this.$store.getters['cart/getProductQuantity'](this.product.id);
      },
      set(quantity) {
        this.setProductQuantity({ product: { ...this.product }, quantity });
      },
    },
  },
  methods: {
    ...mapActions('cart', ['addProductToCart', 'remProductFromCart', 'setProductQuantity']),

    hasBalanceFor(product, quantity) {
      // console.log('hasBalanceFor', product.title, this.balance, (Number(product.price) * quantity));
      return this.balance > (Number(product.price) * quantity);
    },
  },
};
</script>

<style lang="scss" scoped>
  .product {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0,0,0,.3);
    padding: 15px;
    transition: all .3s ease-in-out;
    position: relative;

    p {
      width: 100%;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .product-info-link {
      position: absolute;
      top: 8px;
      right: 8px;
      display: block;
      width: 22px;
    }
  }

  .product-image {
    width: 100%;
    height: auto;

    &.rounded {
      border-radius: 50%;
    }
  }

  .product-title {
    margin-bottom: 0;
    width: 100%;

    & + p {
      margin-top: 0;
    }
  }

  .product-description {
    font-size: 14px;
  }

  .actions {
    display: flex;
    width: 100%;

    .quantity-input {
      flex: 1;
      width: auto;
      min-width: 0;
      border: 1px solid transparent;
      text-align: center;
      height: 35px;
    }

    .button {
      cursor: pointer;
      border: none;
      width: 60px;
      height: 35px;

      &.buy {
        background: rgb(249,114,148);
        border-radius: 0 8px 8px 0;
      }

      &.sell {
        border-radius: 8px 0 0 8px;
        background: rgba(246,226,99,1);
      }

      &.disabled {
        pointer-events: none;
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
</style>
