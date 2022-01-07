<template>
  <div :class="[getClass, !ignoreTime ? 'last' : '', 'mes-box']">
    <template v-if="getClass === 'date'">
      <div class="date">
        {{ getTime(msg.createdAt, "MMM D, YYYY") }}
      </div>
    </template>
    <template v-else>
      <div class="mes">
        <div
          v-if="['date', 'rtl'].indexOf(getClass) === -1 && !ignoreTime"
          class="mes-avatar"
        >
          <img :src="user.avatar" :alt="user.nickname" />
        </div>
        <div class="mes-content">
          {{ msg.content }}
        </div>
      </div>
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
      target: "chat/target",
    }),

    getClass() {
      if (this.msg.type === 1) {
        return this.msg.userId.includes(this.me.uid) ? "rtl" : "ltr";
      }

      return "date";
    },

    user() {
      if (this.getClass === "rtl") {
        return { avatar: this.me.photoURL, nickname: this.me.displayName };
      }

      return this.target;
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
      &-content {
        background-color: royalblue;
        color: #fff;
        border-radius: 20px 5px 5px 20px;
      }

      &-avatar {
        right: 0;
      }
    }

    &.first {
      .mes-content {
        border-bottom-right-radius: 5px;
        border-top-right-radius: 20px;
      }
    }

    &.last {
      .mes-content {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 20px;
      }
    }
  }
  &.ltr {
    align-items: flex-start;
    .mes {
      padding-left: 35px;
      &-content {
        background-color: #efefef;
        border-radius: 5px 20px 20px 5px;
      }

      &-avatar {
        left: 0;
      }
    }

    &.first {
      .mes-content {
        border-bottom-left-radius: 5px;
        border-top-left-radius: 20px;
      }
    }

    &.last {
      .mes-content {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 20px;
      }
    }

    &.last.first {
      .mes-content {
        border-radius: 20px;
      }
    }
  }
  .mes {
    position: relative;
    &-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 6px;
    }

    &-content {
      padding: 6px 12px;
      margin-bottom: 2px;
      color: #000000;
      position: relative;
      border-radius: 20px;
      font-size: 15px;
    }
  }

  .date {
    text-align: center;
    width: 100%;
    font-size: 13px;
    color: #909090;
  }
}
</style>
