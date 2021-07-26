import axios from "axios";

export default {
  path: "https://pokeapi.co/api/v2/",

  async getPokemons(limit, offset) {
    return axios.get(this.path + `pokemon?limit=${limit}offset=${offset}`);
  },
  async getPokemon(index) {
    return axios.get(this.path + `pokemon/${index}`);
  },
  async getAllPokemons() {
    return axios.get(this.path + `pokemon?limit=1118`);
  },
};
