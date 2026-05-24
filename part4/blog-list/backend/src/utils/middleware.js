const errorHandler = (error, request, response, next) => {
  console.error(error.message) // Ajuda a ver o erro no console durante os testes

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  
  // SEU CÓDIGO PRECISA DESTA CONDIÇÃO AQUI:
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  unknownEndpoint,
  errorHandler
}