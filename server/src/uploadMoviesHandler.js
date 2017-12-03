class UploadMoviesHandler {
  constructor(store) {
    this.store = store;
  }

  static fileNameValid(name) {
    return /(\.xml|\.json)$/i.test(name);
  }

  static parseFile(file) {
    if (/\.xml$/i.test(file.name)) {
      return parseXml(file.data.toString());
    }
    return JSON.parse(file.data.toString());
  }

  async handleRequest(req, res) {
    const file = req.files.movieList;
    if (!file || !this.constructor.fileNameValid(file.name)) {
      res.status(422);
      res.send({ message: 'xml/json file required' });
      return;
    }
    const movies = this.constructor.parseFile(file);
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
