<template>
  <div id="app">
    <div class="container">
      <Login @set-auth="setAuth" :authentication="authentication" />
      <Chat />
    </div>
  </div>
</template>

<script>
import Chat from "./components/Chat.vue";
import Login from "./components/Login.vue";
export default {
  name: "App",
  components: { Chat, Login },
  data() {
    return {
      authentication: false,
    };
  },
  methods: {
    setAuth(check) {
      this.authentication = check;
    },
  },
};
</script>

<style></style>
