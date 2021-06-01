<template>
  <div class="select" :class="{ 'has-selection': selected }">
    <Person v-for="person in people" :key="person.id" :person="person" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Person from './person.vue';

export default {
  components: {
    Person,
  },
  computed: {
    ...mapState('people', {
      people: 'list',
      lastError: 'lastError',
      selected: 'selected',
    }),
  },
  methods: {
    ...mapActions('people', {
      fetchPeople: 'fetch',
    }),
  },
  created() {
    this.fetchPeople();
  },
};
</script>

<style lang="scss" scoped>
  .select {
    $gap: 24px;
    $maxColumns: 4;
    $maxItemWidth: 150px;

    display: grid;
    grid-column-gap: $gap;
    grid-row-gap: $gap;
    grid-template-columns: repeat(auto-fit, minmax(80px, $maxItemWidth));
    max-width: ($maxItemWidth * $maxColumns) + ($gap * ($maxColumns - 1));
    margin: 0 auto;
    justify-content: center;
    padding-bottom: 30px;
  }
</style>
