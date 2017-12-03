const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const getMoviesHandler = require('./src/getMoviesHandler');
const uploadMoviesHandler = require('./src/uploadMoviesHandler');
const FileStore = require('./src/fileStore');

const PORT = process.env.PORT || 3001;
const IMAGE_DIR = process.env.IMAGE_DIR || path.join(__dirname, 'data/images');
const JSON_STORE_PATH = process.env.STORE_FILE || path.join(__dirname, 'data/movieDatabase.json');

const store = new FileStore(JSON_STORE_PATH);

const app = express();
app.use(cors());
app.use(fileUpload());

app.get('/movies', getMoviesHandler(store));
app.post('/movies', uploadMoviesHandler(store));
app.use('/images', express.static(IMAGE_DIR));

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
