<template>
  <div>
    <template v-for="mood in moods">
      <mood-slider :mood="mood" :key="mood.id" @changed="changeMood"></mood-slider>
    </template>
    <section class="movies">
      <movie-tile v-for="movie in movies" :movie="movie" class="item" :key="movie.id"></movie-tile>
    </section>
  </div>
</template>

<script>
import movies from '../data/mockMovies';
import moods from '../data/moods';
import MoodSlider from './MoodSlider';
import MovieTile from './MovieTile';

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
    MovieTile,
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
  .movies {
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;

    > .item {
      flex: 1;
      min-width: 200px;
      margin-bottom: 2px;
      flex-basis: 0;
    }

    @media (min-width: 620px) {
      > .item {
        max-width: 33.3333%;
      }
    }
    @media (max-width: 619px) {
      > .item {
        max-width: 50%;
      }
    }
    @media (max-width: 440px) {
      > .item {
        min-width: 50%;
      }
    }

    @media (max-width: 340px) {
      > .item {
        min-width: 100%;
      }
    }

    @media (min-width: 820px) {
      > .item {
        max-width: 25%;
      }
    }
  }
</style>
