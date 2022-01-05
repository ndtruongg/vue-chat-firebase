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
        {{ item.nickname }}
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
