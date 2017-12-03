let store;

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

async function getMoviesHandler(req, res) {
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
    const movies = await store.getMovies();
    const moviesByMood = getMoviesByMood(movies, moods).slice(0, limit);
    res.send({ movies: moviesByMood });
  } catch (err) {
    res.status(500);
    res.send({ message: 'Unknown error' });
    console.error('Failed to retrieve movies:', req.query, err);
  }
}

module.exports = (storeObject) => {
  store = storeObject;
  return getMoviesHandler;
};
