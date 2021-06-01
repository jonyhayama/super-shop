<template>
  <div>
    <div v-if="!productsError" class="product-list">
      <div v-for="product in products" :key="product.id" class="product">
        <ProductItem :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductItem from './item.vue';

export default {
  components: {
    ProductItem,
  },
  computed: {
    ...mapState('products', {
      products: 'list',
      productsError: 'lastError',
    }),
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),

  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style lang="scss" scoped>
  .product-list {
    $gap: 15px;
    $maxColumns: 3;
    $maxItemWidth: 225px;

    display: grid;
    grid-column-gap: $gap;
    grid-row-gap: $gap;
    grid-template-columns: repeat(auto-fit, minmax(80px, $maxItemWidth));
    max-width: ($maxItemWidth * $maxColumns) + ($gap * ($maxColumns - 1));
    margin: 0 auto;
    justify-content: center;
  }
</style>
