<template>
  <div :class="[getClass, 'mes-box']">
    <template v-if="getClass === 'date'">
      <div class="date">
        {{ getTime(msg.createdAt, "HH:mm MMM D, YYYY") }}
      </div>
    </template>
    <template v-else>
      <div class="mes">{{ msg.content }}</div>
      <div v-if="!ignoreTime" class="time">{{ getTime(msg.createdAt) }}</div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ChatMessageBox",
  props: {
    msg: Object,
    ignoreTime: Boolean,
  },

  computed: {
    ...mapGetters({
      me: "me/info",
    }),

    getClass() {
      if (this.msg.type === 1) {
        return this.msg.userId.includes(this.me.uid) ? "rtl" : "ltr";
      }

      return "date";
    },
  },

  methods: {
    getTime(createdAt, type = "HH:mm") {
      let time = new Date(
        createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6
      );
      return this.$dayjs(time).format(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.mes-box {
  display: flex;
  flex-direction: column;
  .time {
    font-size: 12px;
    width: 100%;
    text-align: center;
    color: #888;
    margin-bottom: 10px;
  }
  &.rtl {
    align-items: flex-end;

    .mes {
      background-color: #2980b9;
      border-radius: 20px 18px 5px 20px;
    }
  }
  &.ltr {
    align-items: flex-start;
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

  .date {
    text-align: center;
    width: 100%;
    font-size: 13px;
    color: #909090;
  }
}
</style>
