<template>
  <div id="app">
    <div class="container">
      <header>
        <div class="logo"></div>
        <div class="right">
          <h1>The Moodslider</h1>
          <nav>
            <a @click="goToPage('index')" :class="{active: currentPage === 'index'}">Moodslider</a>
            <a @click="goToPage('upload')" :class="{active: currentPage === 'upload'}">Upload Content</a>
          </nav>
        </div>
      </header>
      <section class="page-content">
        <IndexPage v-if="currentPage === 'index'" />
        <UploadPage v-else-if="currentPage === 'upload'" />
      </section>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import IndexPage from './components/IndexPage';
import UploadPage from './components/UploadPage';

export default {
  name: 'app',
  data() {
    return {
      currentPage: 'index',
    };
  },
  components: {
    IndexPage,
    UploadPage,
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style lang="scss">
  @import 'assets/global';
</style>

<style lang="scss" scoped>
  @import 'assets/mixins';

  .container {
    max-width: 700px;
    margin: 60px auto 20px;
    padding: 10px;
    // background: rgba(255, 255, 255, 0.05);
  }

  header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .logo {
      margin-right: 20px;
      display: flex;

      width: 200px;
      height: 122px;
      background: url('/static/logo.png') no-repeat;
      background-size: contain;
    }

    h1 {
      display: block;
      margin: 25px 0 10px;
      font-size: 3em;
    }

    nav {
      $activeColor: rgba(173, 216, 230, 0.25);

      a {
        cursor: pointer;
        display: inline-block;
        padding: 4px 6px;
        font-size: 18px;

        &:not(:last-child) {
          margin-right: 5px;
        }

        &:hover {
          background-color: rgba($activeColor, 0.1);
        }

        &.active {
          background-color: $activeColor;
        }
      }
    }
  }

  .page-content {
    margin-top: 25px;
  }
</style>
