<template>
  <table>
    <tbody>
      <tr v-for="item in cart" :key="item.id">
        <td>{{item.title}}</td>
        <td>x {{item.quantity}}</td>
        <td>${{item.quantity * item.price | short-currency}}</td>
      </tr>
    </tbody>
    <tfoot>
      <td colspan="3">
        Total:
        <span v-if="total >= 1000">${{ total | short-currency }}</span>
        <span v-else>{{ total | currency }}</span>
      </td>
    </tfoot>
  </table>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', {
      total: 'cartTotal',
      cart: 'cartProducts',
    }),
  },
};
</script>

<style lang="scss" scoped>
  table {
    font-size: 14px;
    margin: 0 auto;
    margin-bottom: 15px;

    tbody {
      float: left;

      td:nth-child(1) {
        text-align: right;
        width: 100%;
      }
      td:nth-child(2) {
        text-align: left;
        white-space: nowrap;
        padding: 0 5px;
      }
      td:nth-child(3) {
        text-align: left;
      }
    }

    tfoot {
      font-weight: bold;

      td:nth-child(1) {
        text-align: right;
        border-top: 1px solid;
        padding-top: 10px;
      }
    }
  }
</style>
