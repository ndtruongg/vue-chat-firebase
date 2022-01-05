import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import auth from "@/middleware/auth.js";
import middlewarePipeline from "@/middleware/middlewarePipeline.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./components/Chat.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./components/Login.vue"),
  },
];

const router = new VueRouter({ mode: "history", routes });

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    router,
    store,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
