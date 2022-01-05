<template>
  <div class="header">
    <div class="avatar">
      <img :src="target.avatar" :alt="target.nickname" />
    </div>

    <h3>{{ target.nickname }}</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ChatDetailHeader",
  computed: {
    ...mapGetters({
      target: "chat/target",
    }),
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e9e9e9;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 0;
  }
}
</style>
