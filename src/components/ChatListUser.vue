<template>
  <div class="list-user">
    <h2 class="list-user__title">Chats</h2>
    <router-link
      v-for="(item, key) of users"
      :to="'/' + item.uid"
      :key="key"
      :class="[checkWhoTarget(item.uid) ? 'active' : '', 'list-user__item']"
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
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getLastLogin } from "@/utils/time.js";
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
    getLastLogin,
    async showChat(email) {
      await this.$store.dispatch("chat/getTarget", email);
      await this.$store.dispatch("chat/getMessages");
    },

    checkWhoTarget(id) {
      if (this.$route.params.id === id) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-user {
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  overflow: auto;
  z-index: 2;
  border-right: 1px solid #f7f7f7;

  &__title {
    margin-bottom: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    color: #000;
    background: #fff;
    margin-bottom: 8px;
    border-radius: 10px;
    transition: ease 0.3s all;
    &.active {
      background-color: rgba(210, 226, 255, 0.29);
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
  }
}
</style>
