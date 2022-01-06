import db from "@/plugins/firebase.js";

import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  orderBy,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";

export const state = {
  users: [],
  messageUID: null,
  messages: [],
  target: {},
};

export const getters = {
  users: (state) => state.users,
  messages: (state) => state.messages,
  target: (state) => state.target,
  messageUID: (state) => state.messageUID,
};

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  SET_TARGET(state, payload) {
    state.target = payload;
  },
  SET_MESSAGES(state, payload) {
    state.messages = payload;
  },
  SET_MESSAGE_UID(state, payload) {
    state.messageUID = payload;
  },
};

export const actions = {
  getUsers({ commit }) {
    const emailForSignIn = localStorage.getItem("emailForSignIn");
    const queryUser = query(
      collection(db, "user"),
      where("email", "!=", emailForSignIn)
    );
    onSnapshot(queryUser, (querySnapshot) => {
      let payload = [];
      querySnapshot.forEach((docRef) => {
        payload.push({
          ...docRef.data(),
          uid: docRef.id,
        });
      });

      commit("SET_USERS", payload);
    });
  },

  async getTarget({ commit }, uid) {
    let payload = null;
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      payload = { uid, ...docSnap.data() };
    }

    commit("SET_TARGET", payload);
    commit("SET_MESSAGES", []); // reset when change target
    commit("SET_MESSAGE_UID", null);
  },

  async getMessages({ commit, state, rootState }) {
    const queryMsg = query(
      collection(db, "room"),
      where("userIds", "in", [
        [rootState.me.info.uid, state.target.uid],
        [state.target.uid, rootState.me.info.uid],
      ])
    );

    const historySnapshot = await getDocs(queryMsg);
    if (!historySnapshot.empty) {
      historySnapshot.forEach(async (docRef) => {
        const qMessages = query(
          collection(db, "room", docRef.id, "messages"),
          orderBy("createdAt", "asc")
        );
        commit("SET_MESSAGE_UID", docRef.id);

        await onSnapshot(qMessages, (messageSnapshot) => {
          let messages = state.messages;
          messageSnapshot.forEach((docMsg) => {
            let checkExistDocument = messages.find(
              (item) => item.id === docMsg.id
            );
            if (!checkExistDocument) {
              messages = [...messages, { id: docMsg.id, ...docMsg.data() }];
            }
          });

          commit("SET_MESSAGES", messages);
        });
      });
    } else {
      const docRef = await addDoc(collection(db, "room"), {
        createdAt: new Date(),
        userIds: [rootState.me.info.uid, state.target.uid],
      });
      commit("SET_MESSAGE_UID", docRef.id);
    }
  },
};
