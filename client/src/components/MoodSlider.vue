<template>
  <div>
    <vue-slider v-model="value" tooltip="false" min="-1" max="1" interval="0.1" value="0" speed="0.2" lazy="true" dot-size="25" process-style="{background: 'none'}" />
    {{value}}
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
  name: 'IndexPage',
  data() {
    return {
      value: 0,
    };
  },
  components: {
    vueSlider,
  },
};
</script>

<style lang="scss" scoped>

</style>
