<template>
  <a href="#" @click.prevent="toggleSelectedPerson(person)" class="person" :class="{ selected: isSelected(person) }">
    <img class="avatar" :src="person.avatar" />
    <span class="name">{{ person.name }}</span>
  </a>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    person: {
      type: Object,
      default: () => ({
        name: 'loading...',
        avatar: '',
      }),
    },
  },
  computed: {
    ...mapState('people', {
      selected: 'selected',
    }),
  },
  methods: {
    ...mapActions('people', {
      setSelected: 'setSelected',
    }),
    ...mapActions('cart', {
      clearCart: 'clear',
    }),
    isSelected(person) {
      return this.selected && person.id === this.selected.id;
    },
    toggleSelectedPerson(person) {
      if (this.selected === person) {
        this.setSelected(null);
        this.clearCart();
      } else {
        this.setSelected(person);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .person {
    display: inline-block;
    transition: all .3s ease-in-out;
    text-decoration: none;

    img {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      object-fit: contain;
      border: 5px solid transparent;
    }

    .name {
      display: block;
    }

    .has-selection &:not(.selected) {
      display: none;
    }
  }
</style>
