<template>
  <div>
    <template v-for="mood in moods">
      <mood-slider :mood="mood" :key="mood.id" @changed="changeMood"></mood-slider>
    </template>
    <section class="movies">
      <movie-tile v-for="movie in movies" :movie="movie" class="item" :key="movie.id"></movie-tile>
      <div v-if="errorMessage">An error occurred while retrieving movie list:<br /> {{ errorMessage }}</div>
    </section>
  </div>
</template>

<script>
import * as axios from 'axios';

import MoodSlider from './MoodSlider';
import MovieTile from './MovieTile';

import getMoods from '../data/moods';

const MOVIES_ENDPOINT = `${process.env.API_URL}/movies`;

const getSingleMood = moodPair => ({
  id: moodPair.value > 0 ? moodPair.right.id : moodPair.left.id,
  value: Math.abs(moodPair.value),
});

export default {
  name: 'IndexPage',
  data() {
    return {
      moods: getMoods(),
      movies: [],
      errorMessage: null,
    };
  },
  components: {
    MoodSlider,
    MovieTile,
  },
  methods: {
    changeMood(moodId, value) {
      this.moods.find(m => m.id === moodId).value = value;
      this.updateMovies();
    },
    async updateMovies() {
      this.errorMessage = null;
      const singleMoods = this.moods
        .filter(mood => mood.value !== 0)
        .map(getSingleMood);
      if (singleMoods.length === 0) {
        this.movies = [];
        return null;
      }
      return axios.get(MOVIES_ENDPOINT, { params: { moods: singleMoods } })
        .then((res) => {
          this.movies = res.data.movies;
        })
        .catch((err) => {
          this.errorMessage = err.toString();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/mixins';

  .movies {
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;

    > .item {
      flex: 1;
      @include min-max-width(20%);
      margin-bottom: 2px;

      @media (max-width: 900px) {
        @include min-max-width(25%);
      }
      @media (max-width: 740px) {
        @include min-max-width(33.3333%);
      }
      @media (max-width: 560px) {
        @include min-max-width(50%);
      }
      @media (max-width: 380px) {
        @include min-max-width(100%);
      }
    }
  }
</style>
