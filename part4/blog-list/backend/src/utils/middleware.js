const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  if (error.code === 11000) { // duplicate key error. Notr only for username, but in this case we only have username with unique constraint, so we can assume it's for username.
    return response.status(400).json({ error: "username must be unique" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
