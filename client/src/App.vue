<template>
  <div id="app">
    <div class="container">
      <header>
        <div class="logo"></div>
        <div class="right">
          <h1>The Moodslider</h1>
          <nav>
            <a @click="goToPage('index')" :class="{ active: currentPage === 'index' }">Moodslider</a>
            <a @click="goToPage('upload')" :class="{ active: currentPage === 'upload' }">Upload Content</a>
          </nav>
        </div>
      </header>
      <section class="page-content">
        <IndexPage v-if="currentPage === 'index'"/>
        <UploadPage v-else-if="currentPage === 'upload'"/>
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
    max-width: 820px;
    margin: 50px auto 20px;
    padding: 10px;

    @media (max-width: 555px) {
      margin-top: 10px;
    }
  }

  header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    user-select: none;

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
        border-radius: 2px;
        cursor: pointer;
        display: inline-block;
        font-size: 18px;
        padding: 4px 6px;
        transition: background 0.2s;

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
