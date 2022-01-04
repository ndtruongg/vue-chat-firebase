<template>
  <transition name="slide">
    <div v-if="!auth" class="login">
      <button class="btn-login" @click="loginWithGoogle">
        <img src="@/assets/images/google-logo.png" alt="" />
        <span>Login with Google</span>
      </button>
    </div>
  </transition>
</template>

<script>
import db from "@/plugins/firebase.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "@firebase/auth";
import { doc, setDoc, updateDoc } from "@firebase/firestore";

const provider = new GoogleAuthProvider();

export default {
  name: "Login",
  props: {
    authentication: Boolean,
  },
  data() {
    return {
      auth: null,
    };
  },

  async created() {
    await onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        this.auth = user;
        let authToken = localStorage.getItem("firebase-auth-token");

        await updateDoc(doc(db, "user", authToken), {
          online: true,
        });
      }
    });
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

          localStorage.setItem("firebase-auth-token", this.auth.uid);
          localStorage.setItem("emailForSignIn", this.auth.email);
          this.$emit("set-auth", true);
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

.slide {
  &-enter,
  &-leave-to {
    transform: translateY(-100vh);
  }

  &-enter-active,
  &-leave-active {
    transition: ease all 0.4s;
  }

  &-enter-to,
  &-leave {
    transform: translateY(0);
  }
}
</style>
