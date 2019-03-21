<template>
  <div>
    Login:
    <form action="#" @submit.prevent="submitLogin">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email">
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["retrieveToken"]),

    submitLogin(e) {
      e.preventDefault();
      this.retrieveToken({
        email: this.email,
        password: this.password
      }).then(this.$router.push({ name: "decks" }));
    }
  }
};
</script>

<style>
</style>
