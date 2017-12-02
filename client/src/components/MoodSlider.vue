<template>
  <div class="slider-container">
    <label @click="changeValue(-1)">{{ mood.left.label }}</label>
    <vue-slider ref="slider"
      v-model="value"
      :tooltip="false"
      :min="-1"
      :max="1"
      :interval="0.1"
      :speed="0.2"
      :lazy="true"
      :dot-size="25"
      :process-style="{background: 'none'}"
      @callback="changeValue"
    />
    <label @click="changeValue(1)">{{ mood.right.label }}</label>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
  name: 'MoodSlider',
  props: ['mood'],
  components: {
    vueSlider,
  },
  computed: {
    value: {
      get() {
        return this.mood.value;
      },
      set() {},
    },
  },
  methods: {
    changeValue(value) {
      this.$emit('changed', this.mood.id, value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .slider-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    user-select: none;

    label {
      cursor: pointer;
      display: block;
      width: 110px;

      &:first-child {
        text-align: right;
      }

      @media (max-width: 510px) {
        width: 55px;
      }
    }

    .vue-slider-component {
      margin: 0 10px;
      display: block;
      flex: 1;
    }
  }
</style>
