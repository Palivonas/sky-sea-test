const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const getMoviesHandler = require('./src/getMoviesHandler');
const UploadMoviesHandler = require('./src/uploadMoviesHandler');
const FileStore = require('./src/fileStore');

const store = new FileStore(path.join(__dirname, 'data/movieDatabase.json'));

const PORT = process.env.PORT || 3001;
const IMAGE_DIR = path.join(__dirname, 'data/images');

const app = express();
app.use(cors());
app.use(fileUpload());

app.get('/movies', getMoviesHandler(store));
app.post('/movies', UploadMoviesHandler(store));
app.use('/images', express.static(IMAGE_DIR));

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
