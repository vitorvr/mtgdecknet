import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/auth/Login';
import Decks from './components/Decks';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/decks',
      name: 'decks',
      component: Decks
    }
  ]
});
