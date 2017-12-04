function getFitness(movie, userMoods) {
  if (movie.moodsExclude) {
    if (movie.moodsExclude.find(moodId => userMoods.find(mood => mood.id === moodId))) {
      return 0;
    }
  }

  return userMoods
    .map((mood) => {
      const indexInMovie = movie.moods.indexOf(mood.id);
      if (indexInMovie === -1) {
        return 0;
      }
      const indexMultiplier = 0.75 ** indexInMovie;
      return mood.value * indexMultiplier;
    })
    .reduce((a, b) => a + b, 0);
}

function getMoviesByMood(movies, userMoods) {
  return movies
    .map(movie => ({
      ...movie,
      fitness: getFitness(movie, userMoods),
    }))
    .filter(movie => movie.fitness > 0)
    .sort((a, b) => ((b.fitness - a.fitness) || Math.random() - 0.5));
}

class GetMoviesHandler {
  constructor(store, imageDirUrl) {
    this.store = store;
    this.imageDirUrl = imageDirUrl;
  }

  async handleRequest(req, res) {
    if (!req.query.moods || !req.query.moods.length) {
      res.status(422);
      res.send({ message: 'Mood list required' });
    }

    const moods = req.query.moods.map((moodJson) => {
      const mood = JSON.parse(moodJson);
      return {
        id: String(mood.id),
        value: Math.min(Math.abs(parseFloat(mood.value)), 1),
      };
    });

    const limit = Math.min(Math.abs(parseInt(req.query.limit, 10)) || 5, 20);
    try {
      const allMovies = await this.store.getMovies();
      const moviesByMood = getMoviesByMood(allMovies, moods).slice(0, limit);
      const withImageUrls = moviesByMood
        .map(movie => ({
          ...movie,
          imageUrl: /^https?:\/\//i.test(movie.image) ? movie.image : `${this.imageDirUrl}/${movie.image}`,
        }));
      res.send({ movies: withImageUrls });
    } catch (err) {
      res.status(500);
      res.send({ message: 'Unknown error' });
      console.error(`Failed to retrieve movies, IP address ${req.connection.remoteAddress}`, req.query, err);
    }
  }
}

module.exports = (store, imageDirUrl) => {
  const handler = new GetMoviesHandler(store, imageDirUrl);
  return handler.handleRequest.bind(handler);
};
