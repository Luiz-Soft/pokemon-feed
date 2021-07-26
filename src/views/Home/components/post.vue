<template>
  <router-link
    title="Detalhes"
    :to="{ name: 'details', params: { uuid: pokemonNumber } }"
  >
    <div class="container">
      <table class="table table-borderless con detail-table">
        <tbody>
          <tr>
            <td rowspan="2" class="align-middle" width="20 ;">
              <img
                class="rounded-circle"
                :src="pokemonContent.sprites.front_default"
                alt=""
                id="profile-img"
              />
            </td>
            <td colspan="4">{{ pokemon.name }}</td>
            <td colspan="10" class="d-flex justify-content-end mt-2">
              <i class="fas fa-ellipsis-h"></i>
            </td>
          </tr>
          <tr>
            <td>Postado há duas horas</td>
          </tr>
          <tr>
            <td colspan="12" class="">
              <img
                id="article-file"
                src="https://cdn2.bulbagarden.net/upload/thumb/1/13/Pok%C3%A9_Ball_success.png/800px-Pok%C3%A9_Ball_success.png"
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td colspan="12" class="article-text align-middle"></td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
    </div>
  </router-link>
</template>

<script>
import PokemonService from "../../../../src/services/PokemonService";

export default {
  name: "Post",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      pokemonContent: [],
    };
  },

  computed: {
    pokemonNumber() {
      let tempNumber = "";
      tempNumber = this.pokemon.url.replaceAll(
        "https://pokeapi.co/api/v2/pokemon/",
        ""
      );
      tempNumber = tempNumber.replaceAll("/", "");
      return tempNumber;
    },
  },

  created() {
    this.getPokemon(this.pokemonNumber);
  },
  updated() {
    this.getPokemon(this.pokemonNumber);
  },
  methods: {
    getPokemon(index) {
      PokemonService.getPokemon(index)
        .then((response) => {
          this.pokemonContent = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.detail-table #profile-img {
  height: 50vw;
  width: 50vw;
  max-height: 50px;
  max-width: 50px;
  object-fit: cover;
}

.detail-table tr td {
  padding: 2px;
}

#submit-btn,
textarea {
  font-size: 0.8rem;
}

.detail-table #article-file {
  height: 100vw;
  width: 100vw;
  max-height: 500px;
  max-width: 500px;
  object-fit: cover;
  padding: 0;
}

.con {
  max-width: 400px;
  margin: 0 auto;
}

.article-text {
  font-size: 0.8rem;
}

.article-text span {
  display: block;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.reveal-btn {
  display: none;
  cursor: pointer;
}

.hide-btn {
  display: none;
  cursor: pointer;
}
</style>
