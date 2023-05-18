<script setup lang="ts">
import { onMounted, reactive } from "vue";
import type { SigninFormInterface } from "@/shared/interfaces";
import { useUser } from "@/shared/stores";

const userStore = useUser();

onMounted(() => {
  userStore.error = "";
});

const loginState = reactive<SigninFormInterface>({
  email: "bob@marley.com",
  password: "Pass123$",
  // email: "",
  // password: "",
});

const submitLoginForm = () => {
  userStore.loginUser(loginState);
};

</script>

<template>
  <div id="login-form" class="card login-form">
  <h3>Ouvrir une session</h3>
  <p>Connectez-vous pour accéder à vos commandes, vos adresses et vos informations personnelles.</p>

  <div class="form-group">
      <label for="loginEmail">Adresse e-mail</label>
      <input type="email" class="form-control text-input my-2" id="loginEmail" v-model="loginState.email"
        placeholder="email@email.com">

      <label for="loginPassword">Mot de passe</label>
      <input type="password" class="form-control text-input my-2" id="loginPassword" v-model="loginState.password"
        placeholder="Mot de passe" @keydown.enter="submitLoginForm">

      <button id="submit-login" @click="submitLoginForm" class="btn btn-primary btn-block my-2">
        Se connecter
      </button>

      <div>
        <p v-if="userStore.error" class="error">Vos informations de connexion sont invalides</p>
      </div>

      <h4 class="text-center my-2">ou</h4>

      <!--<div class="facebook-connection m-1">
        <button @click="userStore.loginUserWithFacebook()" class="btn partner-connection-btn">
          <img src="/images/facebook.png" class="partner-connection-icon me-2">
          <span> Se connecter avec Facebook</span>
        </button>
      </div>-->
      <div @click="userStore.loginUserWithGoogle()" class="google-connection m-1">
        <button class="d-flex align-items-center btn partner-connection-btn">
          <img src="/images/google.png" class="partner-connection-icon me-2">
          <span class="ms-2"> Se connecter avec Google</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  padding: 30px;
  border: none;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  background-color: var(--light-gray-background);
  border-radius: 15px;
  padding: 1.5rem 2rem;
}

.text-input {
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: transparent;
  margin-bottom: 5px;
}

.partner-connection-btn {
  font-size: 1.1rem;

  &:hover {
    opacity: 0.8;

    span {
      color: var(--primary-color-2);
    }
  }

  .partner-connection-icon {
    height: 50px;
    width: 50px;
  }
}

.error {
  border-color: var(--danger-color) !important;
}
</style>
