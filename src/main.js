import Vue from "vue";
import App from "./App.vue";
import dayjs from "dayjs";
import store from "./store";
import router from "./router";

import "@/assets/scss/global.scss";
import "material-icons/iconfont/material-icons.css";

Vue.config.productionTip = false;

Vue.prototype.$dayjs = dayjs;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
