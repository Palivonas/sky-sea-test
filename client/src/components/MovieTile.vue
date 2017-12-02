<template>
  <a class="movie-tile" :href="movie.url" target="_blank">
    <div class="image-container">
      <img :src="movie.image" />
      <div class="description">
        {{ movie.description }}
        <div class="certificate" v-if="movie.certificate">Certificate: {{ movie.certificate }}</div>
      </div>
    </div>
    <h4 class="title">{{ movie.title }}</h4>
    <div class="details">
      <span>{{ movie.year }}</span>
      <span>{{ movie.time }}min</span>
      <span><star-icon class="star" v-for="n in movie.rating" :key="n"/></span>
    </div>
  </a>
</template>

<script>
  import StarIcon from './StarIcon';

  export default {
    name: 'MovieTile',
    props: ['movie'],
    components: { StarIcon },
  };
</script>

<style lang="scss" scoped>
  .movie-tile {
    display: block;
    padding: 5px;
    border-radius: 2px;
    transition: background 0.3s;

    .title {
      margin: 3px 0 0;
      position: relative;
      text-align: center;
      transition: all 0.3s;
    }

    .image-container {
      overflow: hidden;
      position: relative;

      img {
        display: block;
        width: 100%;
        transition: transform 0.4s;
      }

      .description {
        position: absolute;
        font-weight: bold;
        margin: 0;
        padding: 7px 7px 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(black, 0.6);
        opacity: 0;
        transition: opacity 0.3s;

        .certificate {
          text-align: left;
          margin-top: 10px;
        }
      }
    }

    .details {
      margin-top: 3px;
      display: flex;
      align-items: center;
      justify-content: center;

      > span {
        display: block;

        &:not(:last-child) {
          border-right: 1px solid rgba(lightcyan, 0.5);
          padding-right: 4px;
          margin-right: 4px;
        }

        .star:not(:last-child) {
          margin-right: 1px;
        }
      }
    }

    &:hover {
      background: rgba(lightblue, 0.2);

      .image-container img {
        transform: scale(1.06);
      }

      .description {
        opacity: 1;
      }
    }
  }
</style>
