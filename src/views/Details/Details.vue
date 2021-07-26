<template>
  <div>
    <Navbar />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <div class="container">
      <div class="row">
        <h2>Detalhes do pokemon</h2>

        <div class="col-md-7 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>{{ pokemonContent.name }}</h4>
            </div>
            <div class="panel-body">
              <div class="box box-info">
                <div class="box-body">
                  <div class="col-sm-6">
                    <div align="center">
                      <img
                        alt="User Pic"
                        :src="pokemonContent.sprites.front_default"
                        id="profile-image1"
                        class="img-circle img-responsive"
                      />

                      <input
                        id="profile-image-upload"
                        class="hidden"
                        type="file"
                      />

                      <!--Upload Image Js And Css-->
                    </div>
                    <br />
                    <!-- /input-group -->
                  </div>
                  <div class="col-sm-6">
                    <h4 style="color:#00b1b1;">{{ pokemonContent.name }}</h4>
                    <span
                      v-for="(type, index) in pokemonContent.types"
                      :key="index"
                      ><p>{{ type.type.name }}</p></span
                    >
                  </div>
                  <div class="clearfix"></div>
                  <hr style="margin:5px 0 5px 0;" />

                  <div class="col-sm-5 col-xs-6 title ">Aparições em jogos</div>
                  <div class="col-sm-7 col-xs-6 ">
                    {{ pokemonContent.game_indices.length }}
                  </div>
                  <div class="clearfix"></div>
                  <div class="bot-border"></div>

                  <div class="col-sm-5 col-xs-6 title ">Altura</div>
                  <div class="col-sm-7">{{ pokemonContent.height }}</div>
                  <div class="clearfix"></div>
                  <div class="bot-border"></div>

                  <div class="col-sm-5 col-xs-6 title ">Movimentos</div>
                  <div class="col-sm-7">{{ pokemonContent.moves.length }}</div>
                  <div class="clearfix"></div>
                  <div class="bot-border"></div>

                  <div class="col-sm-5 col-xs-6 title ">Peso</div>
                  <div class="col-sm-7">{{ pokemonContent.weight }}</div>

                  <div class="clearfix"></div>
                  <div class="bot-border"></div>

                  <!-- /.box-body -->
                </div>
                <!-- /.box -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import PokemonService from "../../../src/services/PokemonService";

export default {
  name: "Home",
  components: { Navbar },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pokemonContent: [],
    };
  },
  created() {
    this.getPokemon(this.id);
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
