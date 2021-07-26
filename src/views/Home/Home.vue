<template>
  <div ref="scrollComponent">
    <Navbar
      @issearching="updateIsSearching($event)"
      @searchedpokemons="updateSearchedPokemons($event)"
    />
    <div v-if="isSearching === false">
      <Post
        v-for="(pokemon, key) in pokemons"
        :key="key"
        :pokemon="pokemon"
        :index="key"
      />
    </div>
    <div v-if="isSearching === true">
      <Post
        v-for="(pokemon, key) in searchedPokemons"
        :key="key"
        :pokemon="pokemon"
      />
    </div>
    <h1 id="final"></h1>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Post from "./components/post.vue";
import PokemonService from "../../../src/services/PokemonService";

export default {
  name: "Home",
  components: { Navbar, Post },

  data() {
    return {
      pokemons: [],
      loading: false,
      scrollComponent: null,
      postLimit: 20,
      scrolledToBottom: false,
      isSearching: false,
      searchedPokemons: [],
    };
  },
  created() {
    this.getPokemons(this.postLimit, 0);
  },
  mounted() {
    this.scroll();
  },
  methods: {
    updateSearchedPokemons(updatedSearchedPokemons) {
      this.searchedPokemons = updatedSearchedPokemons;
    },
    updateIsSearching(updatedIsSearching) {
      this.isSearching = updatedIsSearching;
    },
    scroll() {
      window.onscroll = () => {
        let scrolledTo = document.querySelector("#final");

        if (scrolledTo && this._isScrolledIntoView(scrolledTo)) {
          this.postLimit = this.postLimit + 20;
          this.getPokemons(this.postLimit, 0);
        }
      };
    },
    _isScrolledIntoView(el) {
      let rect = el.getBoundingClientRect();
      let elemTop = rect.top;
      let elemBottom = rect.bottom;

      let isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    },
    getPokemons(limit, offset) {
      this.loading = true;

      PokemonService.getPokemons(limit, offset)
        .then((response) => {
          this.pokemons = response.data.results;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
  },
};
</script>
