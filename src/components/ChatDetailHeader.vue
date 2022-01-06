<template>
  <div class="header">
    <div class="header-avatar">
      <img :src="target.avatar" :alt="target.nickname" />
    </div>

    <div class="header-info">
      <p class="header-name">{{ target.nickname }}</p>
      <div class="status">
        <div :class="['dot', target.online ? 'active' : '']"></div>
        <template v-if="target.online"> Active now </template>
        <template v-else>
          {{ getLastLogin(target.lastLogin) }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getLastLogin } from "@/utils/time.js";

export default {
  name: "ChatDetailHeader",
  computed: {
    ...mapGetters({
      target: "chat/target",
    }),
  },
  methods: {
    getLastLogin,
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e9e9e9;
  &-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
  }

  &-name {
    font-size: 18px;
    margin-bottom: 0;
  }
  &-info {
    .status {
      font-size: 14px;
      color: #a3a3a3;
    }
  }
}
</style>
