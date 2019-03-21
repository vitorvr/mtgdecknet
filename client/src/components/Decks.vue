<template>
  <div class="decks">
    <div v-for=" deck in getDecks" :key="deck.id" class="deck">
      {{deck.name}}
      <ul v-for=" card in deck.cardList" :key="card.multiverseid">
        <li>
          {{card.quantity}}x -
          <a class="card" :href="card.imageUrl">{{card.name}}</a>
          <div class="image">
            <img :src="card.imageUrl" :alt="card.name">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "decks",

  methods: {
    ...mapActions(["fetchDecks"])
  },

  created() {
    this.fetchDecks(localStorage.getItem("token"));
  },

  computed: {
    ...mapGetters(["getDecks"])
  }
};
</script>

<style scoped>
.deck {
  border: 1px solid black;
  margin: 5px;
}
.decks {
  display: inline-flex;
}
.card:hover ~ .image {
  display: block;
}
.image {
  display: none;
  position: absolute;
}
</style>
