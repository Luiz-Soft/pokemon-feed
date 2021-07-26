<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Pokémon Feed</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Inicio</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              v-model="searchPokemons"
              size="sm"
              class="mr-sm-2"
              placeholder="Procure por um pokémon"
            ></b-form-input>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import PokemonService from "../services/PokemonService";

export default {
  name: "Navbar",

  data() {
    return {
      pokemons: [],
      searchPokemons: "",
      isSearching: false,
    };
  },
  created() {
    this.getPokemons();
  },
  watch: {
    searchPokemons() {
      if (this.searchPokemons.length > 0) {
        this.isSearching = true;
        this.filteredPokemons;
      } else this.isSearching = false;
    },
    isSearching() {
      this.$emit("issearching", this.isSearching);
    },
  },
  computed: {
    filteredPokemons() {
      console.log("//////////////////////////filteredPokemons");
      let tempPokemons = this.pokemons;

      // Process search input
      if (this.searchPokemons != "" && this.searchPokemons) {
        tempPokemons = tempPokemons.filter((tempPokemon) => {
          return tempPokemon.name
            .toUpperCase()
            .includes(this.searchPokemons.toUpperCase());
        });
      }

      //
      this.$emit("searchedpokemons", tempPokemons);
      return tempPokemons;
    },
  },

  methods: {
    getPokemons() {
      this.loading = true;

      PokemonService.getAllPokemons()
        .then((response) => {
          this.pokemons = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
  },
};
</script>
