const fileNameValid = name => /(\.xml|\.json)$/i.test(name);

function structureValid(file) {
  return true;
}

async function uploadMoviesHandler(req, res) {
  const file = req.files.movieList;
  if (!file || !fileNameValid(file.name)) {
    res.status(422);
    res.send({ message: 'xml/json file required' });
    return;
  }
  res.send({ message: 'Movies uploaded' });
}

module.exports = uploadMoviesHandler;
