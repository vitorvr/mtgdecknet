import axios from 'axios';

const state = {
  user: {}
};

const getters = {
  getUser: state => state.user
};

const actions = {
  async login({ commit }, credentials) {
    const response = await axios.post('/api/auth', {
      email: credentials.email,
      password: credentials.password
    });

    commit('login', response.data);
  },
  retrieveToken(context, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth', {
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.token;

          localStorage.setItem('tokeb', token);
          context.commit('retrieveToken', token);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

const mutations = {
  login: (state, user) => (state.user = user),
  retrieveToken: (state, token) => (state.token = token)
};

export default {
  state,
  getters,
  actions,
  mutations
};
