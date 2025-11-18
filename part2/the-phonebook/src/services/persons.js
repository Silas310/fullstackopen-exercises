import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
  return axios.get(baseUrl);
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
}

export default {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson
};