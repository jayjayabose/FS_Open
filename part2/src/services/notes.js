import axios from "axios";
const baseURL = 'http://localhost:3001/notes';

const getAll = () => {
  return axios.get(baseURL);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const udpate = (id, updateObject) => {
  return axios.put(`${baseURL}/${id}`, updateObject);
}

export default {
  getAll,
  create,
  udpate
};

