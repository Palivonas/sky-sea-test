const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const getMoviesHandler = require('./src/getMoviesHandler');
const uploadMoviesHandler = require('./src/uploadMoviesHandler');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(fileUpload());

app.get('/movies', getMoviesHandler);
app.post('/movies', uploadMoviesHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${PORT}`);
});
