const fs = require('fs');

class FileStore {
  constructor(jsonFilePath) {
    this.filePath = jsonFilePath;
    this.cache = null;
  }

  async getMovies() {
    if (!this.cache) {
      try {
        const json = fs.readFileSync(this.filePath);
        this.cache = JSON.parse(json);
      } catch (err) {
        if (err.code === 'ENOENT') {
          return [];
        }
        throw err;
      }
    }
    return [...this.cache];
  }

  async insertMovies(newMovies, { flushExisting }) {
    const newData = [...newMovies];
    if (!flushExisting) {
      const storedList = await this.getMovies();
      newData.push(...storedList
        .filter(storedMovie => !newMovies.find(newMovie => storedMovie.id === newMovie.id)));
    }
    fs.writeFileSync(this.filePath, JSON.stringify(newData));
    this.cache = newData;
  }
}

module.exports = FileStore;
