<template>
  <div>
    <h2>Upload a movie list to the Moodslider database</h2>
    <p>JSON and XML formats are supported</p>
    <label class="upload-button" for="movieFileUpload" tabindex="0" :disabled="isUploading">
      {{ isUploading ? 'Uploading...' : 'Select a file' }}
    </label>
    <p>
      <input type="checkbox" v-model="flushExisting" id="flushExisting"/>
      <label for="flushExisting" class="flush-label">Clear existing movies</label>
    </p>
    <div class="message message--success" v-if="isSuccess">Database has been updated! Redirecting back to sliders in a moment.</div>
    <div class="message message--error" v-else-if="isError">{{ errorMessage || 'Unexpected error' }}</div>

    <form enctype="multipart/form-data">
      <input @change="fileChanged($event.target.files[0])" ref="fileInput" type="file" id="movieFileUpload" accept=".xml, .json" />
    </form>
  </div>
</template>

<script>
  import * as axios from 'axios';

  const MOVIES_ENDPOINT = `${process.env.API_URL}/movies`;
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
            setTimeout(() => this.$emit('uploadComplete'), 1800);
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
        const url = MOVIES_ENDPOINT + (this.flushExisting ? '?flushExisting=true' : '');
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
    font-size: 1.4em;
    text-transform: uppercase;
    padding: 7px 9px;
    background: rgba(173, 216, 230, 0.25);
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: rgba(white, 0.35);
    }
  }

  .flush-label {
    padding-left: 4px;
    vertical-align: middle;
  }

  .message {
    color: white;
    display: inline-block;
    padding: 5px 7px;
    border-radius: 2px;

    &--success {
      background: #0f8a0f;
    }
    &--error {
      background: #af1e1e;
    }
  }
</style>
