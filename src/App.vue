<template>
  <div id="app" :class="{ 'has-person': hasPerson }">
    <div class="people-wrapper">
      <div class="hayama-section">
        <h1 class="hayama-section-title">Super Shop</h1>
        <div v-if="!hasPerson">
          <p>Who's money do you want to spend?</p>
          <PeopleSelect />
        </div>
        <div v-else>
          <PeopleSelect />
          <div class="hayama-section-title hayama-alt">
            {{ balance | currency }} ({{ balance | short-currency }})
          </div>
        </div>
      </div>
      <transition name="fade" appear>
      <div class="hayama-section" v-if="hasPerson && !isCartEmpty">
        <h2 class="hayama-section-title">
          Cart
        </h2>
        <cart />
      </div>
      </transition>
    </div>
    <div class="products-wrapper">
      <div v-if="hasPerson" class="hayama-section">
        <h2 class="hayama-section-title">
          Products
        </h2>
        <product-list />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Cart from './components/Cart.vue';
import ProductList from './components/Products/index.vue';
import PeopleSelect from './components/People/select.vue';

export default {
  name: 'App',
  components: {
    Cart,
    ProductList,
    PeopleSelect,
  },
  computed: {
    ...mapState('people', {
      person: 'selected',
    }),
    ...mapGetters('people', {
      balance: 'selectedBalance',
    }),
    ...mapGetters('cart', {
      isCartEmpty: 'isEmpty',
    }),
    hasPerson() {
      return !!this.person;
    },
  },
};
</script>

<style lang="scss">
  #app {
    text-align: center;
    display: flex;
    align-items: flex-start;
    max-width: 1080px;
    margin: 0 auto;

    .people-wrapper,
    .products-wrapper {
      width: 100%;
      transition: all .3s ease-in-out;
    }

    .products-wrapper {
      width: 0;
      & > .hayama-section {
        padding-bottom: 15px;
      }
    }

    &.has-person {
      .people-wrapper {
        width: 30%;
        position: sticky;
        top: 45px;
        margin-right: 30px;
      }
      .products-wrapper {
        width: 70%
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
