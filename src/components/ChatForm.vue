<template>
  <form class="chat-form" @submit.prevent="sentMessage">
    <input type="text" v-model="messageInput" placeholder="Send a message..." />
    <button
      :class="{ active: messageInput }"
      :disabled="messageInput.length === 0"
    >
      <span class="material-icons-round"> send </span>
    </button>
  </form>
</template>

<script>
import { addDoc, collection } from "@firebase/firestore";
import db from "@/plugins/firebase.js";
import { mapGetters } from "vuex";
export default {
  name: "ChatForm",
  data() {
    return {
      messageInput: "",
      msgUID: null,
    };
  },

  computed: {
    ...mapGetters({
      me: "me/info",
      target: "chat/target",
      messageUID: "chat/messageUID",
    }),
  },

  methods: {
    async sentMessage() {
      let msg = this.messageInput;
      this.messageInput = "";
      if (msg.length > 0) {
        if (!this.messageUID) {
          const docRef = await addDoc(collection(db, "room"), {
            createdAt: new Date(),
            userIds: [this.me.uid, this.target.uid],
          });
          this.$store.commit("chat/SET_MESSAGE_UID", docRef.id);
          this.msgUID = docRef.id;
        }

        await addDoc(
          collection(db, "room", this.msgUID || this.messageUID, "messages"),
          {
            content: msg,
            createdAt: new Date(),
            userId: "user/" + this.me?.uid,
          }
        );
      }

      await this.$store.dispatch("chat/getMessages");
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-form {
  display: flex;
  input {
    flex: 1;
    max-width: calc(100% - 50px);
    padding: 0 15px;
    border: 1px solid #cecece;
    border-radius: 20px;
  }

  button {
    margin-left: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease 0.3s;
    span {
      transition: ease 0.3s;
      color: #727272;
    }

    &:hover,
    &.active {
      background: #3498db;
      span {
        color: #fff;
      }
    }
  }
}
</style>
