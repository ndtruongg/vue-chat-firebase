<template>
  <div class="chat-messages" id="chat-messages">
    <ChatMessageBox
      v-for="(item, key) of messages"
      :key="key"
      :msg="item"
      :class="[item.userId.includes(me.uid) ? 'rtl' : 'ltr']"
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
    }),
  },

  methods: {
    scrollToBottom() {
      const chatBox = document.getElementById("chat-messages");
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
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
}
</style>
