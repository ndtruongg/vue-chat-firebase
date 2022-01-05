export default function auth({ next, router, store }) {
  if (!localStorage.getItem("emailForSignIn")) {
    return router.push({ name: "Login" });
  } else {
    store.dispatch("me/getInfo");
  }

  return next();
}
