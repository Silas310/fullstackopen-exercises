import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
  return axios.get(baseUrl);
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
}


export default {
  getPersons,
  createPerson
};