<template>
  <div>
    <template v-for="mood in moods">
      <mood-slider :mood="mood" :key="mood.id" @changed="changeMood"></mood-slider>
    </template>
    <section class="movies">

    </section>
  </div>
</template>

<script>
import MoodSlider from './MoodSlider';

const moods = [
  {
    id: 'agitated-calm',
    left: { label: 'Agitated', id: 'agitated' },
    right: { label: 'Calm', id: 'calm' },
    value: 0,
  },
  {
    id: 'sad-happy',
    left: { label: 'Sad', id: 'sad' },
    right: { label: 'Happy', id: 'happy' },
    value: 0,
  },
  {
    id: 'tired-awake',
    left: { label: 'Tired', id: 'tired' },
    right: { label: 'Wide Awake', id: 'awake' },
    value: 0,
  },
  {
    id: 'scared-fearless',
    left: { label: 'Scared', id: 'scared' },
    right: { label: 'Fearless', id: 'fearless' },
    value: 0,
  },
];

const movies = [];

export default {
  name: 'IndexPage',
  data() {
    return {
      moods,
      movies,
    };
  },
  components: {
    MoodSlider,
  },
  watch: {
    moods(value) {
      window.console.log(value);
    },
  },
  methods: {
    changeMood(moodId, value) {
      this.moods.find(m => m.id === moodId).value = value;
      window.console.log(moodId, value);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
