import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = token ? { headers: { Authorization: token } } : {}
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error(`Error updating blog: ${error}`)
    throw error
  }
}

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error(`Error deleting blog: ${error}`)
    throw error
  }
}


export default { getAll, create, update, remove, setToken }