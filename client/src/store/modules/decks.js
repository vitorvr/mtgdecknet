import axios from 'axios';

const state = {
  decks: []
};

const getters = {
  getDecks: state => state.decks
};

const actions = {
  async fetchDecks({ commit }, token) {
    try {
      let response = await axios.get('/api/deck', {
        headers: { 'x-auth-token': token }
      });
      commit('fetchDecks', response.data);
    } catch (error) {
      throw error;
    }
  }
};

const mutations = {
  fetchDecks: (state, decks) => (state.decks = decks)
};

export default {
  state,
  getters,
  actions,
  mutations
};
