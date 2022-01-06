<template>
  <div class="chat">
    <ChatListUser />
    <div class="chat-detail">
      <template v-if="!checkTargetExist">
        <ChatDetailHeader />
        <div class="chat-detail__body">
          <ChatMessage />
          <ChatForm />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import db from "@/plugins/firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { mapGetters } from "vuex";

import ChatMessage from "./ChatMessage.vue";
import ChatForm from "./ChatForm.vue";
import ChatDetailHeader from "./ChatDetailHeader.vue";
import ChatListUser from "./ChatListUser.vue";

export default {
  name: "Chat",
  components: { ChatDetailHeader, ChatListUser, ChatMessage, ChatForm },
  props: {
    auth: Object,
  },

  computed: {
    ...mapGetters({
      me: "me/info",
      target: "chat/target",
    }),

    checkTargetExist() {
      return Object.keys(this.target).length === 0;
    },
  },

  watch: {
    $route: async function () {
      this.getData();
    },
  },

  async created() {
    this.getData();
    window.addEventListener(
      "beforeunload",
      () => {
        this.deactivate();
      },
      false
    );
  },

  beforeDestroy() {
    this.deactivate();
  },

  methods: {
    async deactivate() {
      await updateDoc(doc(db, "user", this.me.uid), {
        online: false,
        lastLogin: new Date(),
      });
    },

    async getData() {
      let uid = this.$route.params?.id || null;
      if (uid) {
        await this.$store.dispatch("chat/getTarget", uid);
        await this.$store.dispatch("chat/getMessages");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  height: 100vh;

  &-title {
    margin-bottom: 10px;
  }

  &-room {
    padding: 12px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    width: 300px;
    border-right: 1px solid #e9e9e9;
    height: 100%;
    overflow: auto;
    .r {
      background: #cdcdcc;
      text-align: left;
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
      margin-bottom: 10px;
      &.active {
        background: #3498db;
      }
    }
  }

  &-detail {
    width: calc(100% - 300px);

    &__body {
      padding: 12px;
    }
  }
}
</style>
