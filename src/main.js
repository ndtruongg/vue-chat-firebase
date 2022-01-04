import Vue from "vue";
import App from "./App.vue";
import dayjs from "dayjs";
import store from "./store";

import "@/assets/scss/global.scss";
import "material-icons/iconfont/material-icons.css";

Vue.config.productionTip = false;

Vue.prototype.$dayjs = dayjs;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
