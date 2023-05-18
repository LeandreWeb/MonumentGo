<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import type { UserFormInterface } from "@/shared/interfaces";
import { useUser } from "@/shared/stores";

const userStore = useUser();

onMounted(() => {
  userStore.error = "";
});

const registerState = reactive<UserFormInterface>({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
});

const submitRegisterForm = () => {
  userStore.registerUser(registerState);
};

const isDisabled = computed(() => {
  return !registerState.firstname || !registerState.lastname || !registerState.email || !registerState.password;
});

const isEnoughFirstname = computed(() => {
  return registerState.firstname!.length >= 3 || registerState.firstname!.length === 0;
});
const isEnoughLastname = computed(() => {
  return registerState.lastname!.length >= 3 || registerState.lastname!.length === 0;
});
const isEnoughPassword = computed(() => {
  return registerState.password!.length >= 8 || registerState.password!.length === 0;
});
const isSecure = computed(() => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*\.,_-])[a-zA-Z0-9!@#$%^&*\.,_-]{8,}$/.test(registerState.password!) || registerState.password!.length === 0;
});

const isEmail = computed(() => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerState.email!) || registerState.email!.length === 0;
});

const isEnoughUsername = computed(() => {
  return registerState.username!.length >= 6 || registerState.username!.length === 0;
});

</script>

<template>
  <div id="register-form" class="card register-form">
    <h3>Créer votre compte</h3>
    <p>Créez votre compte pour profiter de nos services.</p>

    <div class="form-group">
      <div class="row">
        <div class="col-6">
          <label for="firstname">Prénom</label>
          <input type="text" v-model="registerState.firstname" :class="{ error: !isEnoughFirstname }"
            class="form-control text-input mb-2" id="firstname" placeholder="John">
          <p v-if="!isEnoughFirstname" class="mb-0"><i>&nbsp; 3 caractères minimum !</i></p>
        </div>
        <div class="col-6">
          <label for="name">Nom</label>
          <input type="text" v-model="registerState.lastname" :class="{ error: !isEnoughLastname }"
            class="form-control text-input mb-2" id="name" placeholder="Doe">
          <p v-if="!isEnoughLastname" class="mb-0"><i>&nbsp; 3 caractères minimum !</i></p>
        </div>
      </div>

      <label for="username">Nom d'utilisateur</label>
      <input type="text" v-model="registerState.username" :class="{ error: !isEnoughUsername }"
        class="form-control text-input mb-2" id="username" placeholder="username123">
      <p v-if="!isEnoughUsername" class="mb-0"><i>&nbsp; 6 caractères minimum !</i></p>

      <label for="registerEmail">Adresse e-mail</label>
      <input type="email" v-model="registerState.email" :class="{ error: !isEmail }" class="form-control text-input mb-2"
        id="registerEmail" placeholder="email@email.com">
      <p v-if="!isEmail" class="mb-0"><i>&nbsp; Votre adresse e-mail est invalide</i></p>

      <label for="registerPassword">Mot de passe</label>
      <input type="password" v-model="registerState.password" :class="{ error: !isEnoughPassword }"
        class="form-control text-input mb-2" id="registerPassword" @keydown.enter="submitRegisterForm">
      <p v-if="!isEnoughPassword" class="mb-0"><i>&nbsp; 8 caractères minimum !</i></p>
      <p v-if="!isSecure" class="mb-0">
        <i>&nbsp; Doit contenir une lettre majuscule et un caractère spécial minimum</i>
      </p>

      <button id="submit-register" @click="submitRegisterForm" class="btn btn-success btn-block my-2"
        :disabled="isDisabled || !isEnoughFirstname || !isEnoughLastname || !isEmail || !isEnoughPassword || !isSecure || !isEnoughUsername">
        Créer mon compte
      </button>
    </div>
    <div>
      <p v-if="userStore.error" class="mb-0"><i>&nbsp;Saisie invalide ou compte existant déjà avec ce
          courriel</i></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-form {
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

.error {
  border-color: var(--danger-color) !important;
}
</style>
