import axios from 'axios';

const state = {
  user: {},
  token: localStorage.getItem('token') || null
};

const getters = {
  getUser: state => state.user
};

const actions = {
  login({ commit }, credentials) {
    return new Promise(async (resolve, reject) => {
      const response = await axios.post('/api/auth', {
        email: credentials.email,
        password: credentials.password
      });

      if (!response) reject(response);

      commit('login', response.data);
      localStorage.setItem('token', response.data.token);

      resolve(response);
    });
  }
};

const mutations = {
  login: (state, user) => (state.user = user)
};

export default {
  state,
  getters,
  actions,
  mutations
};
