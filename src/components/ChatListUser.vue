<template>
  <div class="list-user">
    <h2 class="list-user__title">Chats</h2>
    <template v-for="(item, key) of users">
      <button
        v-if="item.uid !== me.uid"
        :key="key"
        :class="[target.uid === item.uid ? 'active' : '', 'list-user__item']"
        @click="showChat(item.email)"
      >
        <div class="_avatar">
          <img :src="item.avatar" :alt="item.nickname" />
          <span :class="[item.online === true ? 'active' : '', 'dot']"></span>
        </div>
        <div class="_info">
          <p class="name">
            {{ item.nickname }}
          </p>
          <span v-if="!item.online" class="last-login">
            {{ getLastLogin(item.lastLogin) }}
          </span>
        </div>
      </button>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ChatListUser",
  computed: {
    ...mapGetters({
      users: "chat/users",
      target: "chat/target",
      me: "me/info",
    }),
  },

  created() {
    this.$store.dispatch("chat/getUsers");
  },

  methods: {
    async showChat(email) {
      await this.$store.dispatch("chat/getTarget", email);
      await this.$store.dispatch("chat/getMessages");
    },

    getLastLogin(lastTime) {
      let lastLogin =
        new Date().getTime() -
        lastTime.seconds * 1000 +
        lastTime.nanoseconds / 1e6;

      let minutes = Math.floor(lastLogin / 60000);
      if (minutes >= 60) {
        let hours = Math.floor(minutes / 60);
        if (hours >= 24) {
          return Math.floor(hours / 24) + "d ago";
        }
        return hours + "h ago";
      }
      return minutes + "m ago";
    },
  },
};
</script>

<style lang="scss" scoped>
.list-user {
  padding: 12px;
  display: flex;
  flex-direction: column;
  width: 300px;
  border-right: 1px solid #e9e9e9;
  height: 100%;
  overflow: auto;

  &__title {
    margin-bottom: 10px;
  }

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

    ._info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .name {
        font-size: 16px;
      }
      .last-login {
        margin-top: 3px;
        text-align: left;
        font-size: 12px;
        color: #888888;
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
</style>
