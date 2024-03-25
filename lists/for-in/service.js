const axios = require("axios");
const URL = "https://swapi.dev/api/people";

function mapearResult(item) {
  return { name: item.name, height: item.height };
}
async function getPeople(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const resp = await axios.get(url);

  return resp.data.results.map(mapearResult);
}

getPeople("r2");

module.exports = {
  getPeople,
};
