<template>
  <div class="chat-messages" id="chat-messages">
    <div class="target">
      <div class="target-avatar">
        <img :src="target.avatar" :alt="target.nickname" />
      </div>
      <h3>{{ target.nickname }}</h3>
    </div>
    <ChatMessageBox
      v-for="(item, key) of messages"
      :key="key"
      :ignoreTime="ignoreTime(key)"
      :msg="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChatMessageBox from "./ChatMessageBox.vue";
export default {
  components: { ChatMessageBox },
  name: "ChatMessage",

  updated() {
    this.scrollToBottom();
  },

  computed: {
    ...mapGetters({
      messages: "chat/messages",
      me: "me/info",
      target: "chat/target",
    }),
  },

  methods: {
    scrollToBottom() {
      const chatBox = document.getElementById("chat-messages");
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    },
    ignoreTime(key) {
      let minuteSentMsg = Math.floor(this.messages[key].createdAt.seconds / 60);
      if (this.messages[key + 1]) {
        let minuteSentMsgNext = Math.floor(
          this.messages[key + 1].createdAt.seconds / 60
        );

        if (minuteSentMsg === minuteSentMsgNext) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-messages {
  height: calc(100vh - 145px);
  overflow: auto;
  padding-right: 3px;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .target {
    margin: 30px auto;
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-avatar {
      img {
        display: block;
        border-radius: 50%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
