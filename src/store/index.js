import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    auth: {},
  },

  getters: {
    auth: (state) => state.auth,
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.auth = payload;
    },
  },
});

export default store;
