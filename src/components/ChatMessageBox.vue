<template>
  <div class="mes-box">
    <div class="mes">{{ msg.content }}</div>
    <span class="time">{{ getTime(msg.createdAt) }}</span>
  </div>
</template>

<script>
export default {
  name: "ChatMessageBox",
  props: {
    msg: Object,
  },
  methods: {
    getTime(createdAt) {
      let time = new Date(
        createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6
      );
      return this.$dayjs(time).format("HH:mm");
    },
  },
};
</script>

<style lang="scss" scoped>
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
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>
