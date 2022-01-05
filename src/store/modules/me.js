import db from "@/plugins/firebase.js";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";

export const state = {
  info: null,
};

export const getters = {
  info: (state) => state.info,
};

export const mutations = {
  SET_INFO(state, payload) {
    state.info = payload;
  },
};

export const actions = {
  async getInfo({ commit }) {
    await onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        commit("SET_INFO", user);
        await updateDoc(doc(db, "user", user.uid), {
          online: true,
        });
      }
    });
  },
};
