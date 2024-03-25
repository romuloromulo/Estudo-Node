const axios = require("axios");
const URL = "https://swapi.dev/api/people";
async function getPeople(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const resp = await axios.get(url);
  console.log(resp.data);
  return resp.data;
}

getPeople("r2");
