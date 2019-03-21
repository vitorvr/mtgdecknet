<template>
  <div>
    <nav>
      <div v-if="getUser.user">Logged User: {{getUser.user.name}}</div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style>
</style>
