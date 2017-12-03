const xml2js = require('xml2js');
const { promisify } = require('util');

function fileNameValid(name) {
  return /(\.xml|\.json)$/i.test(name);
}

async function parseXml(xml) {
  const rawObject = await promisify(xml2js.parseString)(xml, {
    explicitArray: false,
  });
  const arrayProperties = ['moods', 'moodsExclude'];
  const integerProperties = ['year', 'rating', 'time'];
  return rawObject.programmeData.programmes
    .map((movie) => {
      const clone = { ...movie };
      arrayProperties
        .filter(key => clone[key] && !(clone[key] instanceof Array))
        .forEach((key) => {
          clone[key] = [clone[key]];
        });
      integerProperties
        .filter(key => clone[key])
        .forEach((key) => {
          clone[key] = parseInt(clone[key], 10);
        });
      return clone;
    });
}

async function parseFile(file) {
  if (/\.xml$/i.test(file.name)) {
    return parseXml(file.data.toString());
  }
  return JSON.parse(file.data.toString());
}

class UploadMoviesHandler {
  constructor(store) {
    this.store = store;
  }

  async handleRequest(req, res) {
    const file = req.files.movieList;
    if (!file || !fileNameValid(file.name)) {
      res.status(422);
      res.send({ message: 'xml/json file required' });
      return;
    }
    const movies = await parseFile(file);
    try {
      await this.store.insertMovies(movies, { flushExisting: !!req.query.flushExisting });
      res.send({ message: 'Movies uploaded' });
    } catch (err) {
      res.status(500);
      res.send({ message: 'Unexpected error' });
      console.error('Failed to upload movies:', err);
    }
  }
}

module.exports = (store) => {
  const handler = new UploadMoviesHandler(store);
  return handler.handleRequest.bind(handler);
};
