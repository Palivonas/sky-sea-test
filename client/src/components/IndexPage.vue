<template>
  <mood-slider />
</template>

<script>
import MoodSlider from './MoodSlider';

const moods = [
  {
    left: {label: 'Agitated', id: 'agitated'},
    right: {label: 'Calm', id: 'calm'},
  },
  {
    left: {label: 'Happy', id: 'happy'},
    right: {label: 'Sad', id: 'sad'},
  },
  {
    left: {label: 'Tired', id: 'tired'},
    right: {label: 'Wide Awake', id: 'wideAwake'},
  },
  {
    left: {label: 'Scared', id: 'scared'},
    right: {label: 'Fearless', id: 'fearless'},
  },
];

export default {
  name: 'IndexPage',
  data() {
    return {
      moods,
    };
  },
  components: {
    MoodSlider,
  },
};
</script>

<style lang="scss" scoped>

</style>
