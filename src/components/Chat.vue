<template>
  <div class="chat">
    <ChatListUser />
    <div class="chat-detail">
      <ChatDetailHeader />
      <div class="chat-detail__body">
        <ChatMessage />
        <ChatForm />
      </div>
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
    }),
  },

  mounted() {
    // before browser or tab close
    window.addEventListener("beforeunload", async function () {
      alert("asdfasdf");
      await updateDoc(doc(db, "user", this.me.uid), {
        online: false,
      });
    });
  },

  async beforeDestroy() {
    await updateDoc(doc(db, "user", this.me.uid), {
      online: false,
    });
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

  &-history {
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

    .mes-box {
      display: flex;
      align-items: flex-start;
      .time {
        font-size: 12px;
        margin-top: 12px;
        margin-left: 12px;
        color: #888;
      }
      &.rtl {
        justify-content: flex-end;

        .time {
          order: 1;
          margin-right: 12px;
        }

        .mes {
          order: 2;
          background-color: #2980b9;
          border-radius: 20px 18px 5px 20px;
        }
      }
      &.ltr {
        .mes {
          border-radius: 20px 20px 20px 5px;
          background-color: #2c3e50;
        }
      }
      .mes {
        padding: 6px 12px;
        margin-bottom: 2px;
        color: #fff;
      }
    }
  }

  &-form {
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

  .list-user {
    &__item {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      &.active {
        background: #f1f1f1;
        border-radius: 10px;
      }

      ._avatar {
        width: 40px;
        height: 40px;
        position: relative;
        margin-right: 10px;

        .dot {
          position: absolute;
          z-index: 2;
          bottom: 0px;
          right: 0px;
        }

        img {
          width: 40px;
          border-radius: 50%;
          height: 40px;
        }
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #cecece;

        &.active {
          background: #18eb05;
        }
      }
    }
  }
}

.insert {
  &-enter,
  &-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: ease 0.4s all;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
