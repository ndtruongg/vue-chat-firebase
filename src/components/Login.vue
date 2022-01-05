<template>
  <div class="login">
    <button class="btn-login" @click="loginWithGoogle">
      <img src="@/assets/images/google-logo.png" alt="" />
      <span>Login with Google</span>
    </button>
  </div>
</template>

<script>
import db from "@/plugins/firebase.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { mapGetters } from "vuex";

const provider = new GoogleAuthProvider();

export default {
  name: "Login",
  computed: {
    ...mapGetters({
      me: "me/info",
    }),
  },

  async created() {
    if (localStorage.getItem("emailForSignIn")) {
      await this.$store.dispatch("me/getInfo");

      this.$router.push({ name: "Home" });
    }
  },

  methods: {
    loginWithGoogle() {
      signInWithPopup(getAuth(), provider)
        .then(async (result) => {
          this.auth = result.user;
          await setDoc(doc(db, "user", this.auth.uid), {
            nickname: this.auth?.displayName,
            avatar: this.auth?.photoURL,
            email: this.auth?.email,
            online: true,
          });

          this.$store.commit("me/SET_INFO", result.user);
          localStorage.setItem("firebase-auth-token", this.auth.uid);
          localStorage.setItem("emailForSignIn", this.auth.email);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log({
            errorCode,
            errorMessage,
            email,
            credential,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  min-height: 300px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 1000;

  .btn-login {
    padding: 5px;
    box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    img {
      width: 15px;
      margin-right: 10px;
    }
  }
}
</style>
