<template>
  <div>
    <h2>Upload a movie list to the Moodslider database</h2>
    <p>JSON and XML formats are supported</p>
    <label class="upload-button" for="movieFileUpload" tabindex="0" :disabled="isUploading">
      {{ isUploading ? 'Uploading...' : 'Select a file' }}
    </label>
    <input type="checkbox" v-model="flushExisting" id="flushExisting"/>
    <label for="flushExisting">Clear existing movies</label>
    <div class="message message--success" v-if="isSuccess">Database has been updated! Feel free to try the sliders now.</div>
    <div class="message message--error" v-else-if="isError">{{ errorMessage || 'Unexpected error' }}</div>

    <form enctype="multipart/form-data">
      <input @change="fileChanged($event.target.files[0])" ref="fileInput" type="file" id="movieFileUpload" accept=".xml, .json" />
    </form>
  </div>
</template>

<script>
  import * as axios from 'axios';

  const UPLOAD_URL = 'http://localhost:3001/movies';
  const STATUS_UPLOADING = 'uploading';
  const STATUS_SUCCESS = 'success';
  const STATUS_ERROR = 'error';

  export default {
    name: 'UploadPage',
    computed: {
      isSuccess() {
        return this.status === STATUS_SUCCESS;
      },
      isUploading() {
        return this.status === STATUS_UPLOADING;
      },
      isError() {
        return this.status === STATUS_ERROR;
      },
    },
    data() {
      return {
        flushExisting: false,
        status: null,
        errorMessage: null,
        file: null,
      };
    },
    methods: {
      fileChanged(file) {
        if (!file) {
          this.status = null;
          return;
        }
        if (!/(\.xml|\.json)$/i.test(file.name)) {
          this.status = STATUS_ERROR;
          this.errorMessage = 'Invalid file';
          return;
        }
        this.status = STATUS_UPLOADING;
        this.upload(file)
          .then(() => {
            this.status = STATUS_SUCCESS;
            this.$emit('uploadComplete');
          })
          .catch((err) => {
            this.status = STATUS_ERROR;
            this.errorMessage = (err.data && err.data.message) || 'Unexpected error occurred';
          })
          .then(() => {
            this.file = null;
            if (this.$refs.fileInput) {
              this.$refs.fileInput.value = null;
            }
          });
      },

      upload(file) {
        const form = new FormData();
        form.append('movieList', file);
        const url = UPLOAD_URL + (this.flushExisting ? '?flushExisting=true' : '');
        return axios.post(url, form);
      },
    },
  };
</script>

<style lang="scss" scoped>
  #movieFileUpload {
    display: none;
  }
  .upload-button {
    font-size: 1.6em;
    text-transform: uppercase;
    padding: 3px 5px;
    background: rgba(white, 0.6);
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      background: rgba(white, 0.8);
    }
  }
  .message {
    &--success {
      color: lime;
    }
    &--error {
      color: red;
    }
  }
</style>
