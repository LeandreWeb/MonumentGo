<script setup lang="ts">
import { useUser } from "@/shared/stores";
import { computed, reactive } from "vue";
import { vMaska } from "maska";

const userStore = useUser();
const user = userStore.currentUser;

async function updateUserInfos() {
  await userStore.changeUserInfos(user);
}

const isEnoughFirstname = computed(() => user!.firstname.trim().length >= 3 || user!.firstname.trim().length === 0);
const isEnoughLastname = computed(() => user!.lastname.trim().length >= 3 || user!.lastname.trim().length === 0);
const isEnoughNumberPhone = computed(() => user!.phoneNumber?.length === 14 || user!.phoneNumber?.length === 0);
const isEnoughUsername = computed(() => user!.username.trim().length >= 6 || user!.username.trim().length === 0);

function convertAgeNumber(age: number) {
  if (age == 0) return "Entrez une tranche d'age";
  if (age == 1) return "Tranche d'age de moins de 18 ans";
  if (age == 2) return "Tranche d'age de 18-25 ans";
  if (age == 3) return "Tranche d'age de 25-65 ans";
  if (age == 4) return "Tranche d'age de 65 ans et plus";
}

</script>

<template>
  <div v-if="user !== null">
    <main class="col mb-4" id="personnal-infos">
      <div class="d-flex mt-4">
        <div class="round me-3">
          <span class="avatar">
            {{ user?.firstname!.charAt(0) }}
            {{ user?.lastname!.charAt(0) }}
          </span>
        </div>
        <div class="d-flex flex-column justify-content-center">
          <h5 class="mb-1 fw-bold">{{ user?.username }}</h5>
          <h5 class="mb-1">{{ user?.firstname }} {{ user?.lastname }}</h5>
          <p class="mb-1">{{ user?.email }}</p>
          <p class="mb-1" v-if="user?.phoneNumber !== ''">{{ user?.phoneNumber }}</p>
          <p class="mb-1" v-else>Entrez un téléphone</p>
          <p class="mb-1" v-if="user?.age != 0">{{ convertAgeNumber(user?.age!) }}</p>
          <p class="mb-1" v-else>Entrez une tranche d'age</p>
        </div>
        <div class="ms-4 d-flex align-items-center">
          <button class="btn p-0 edit-btn" data-bs-toggle="collapse" data-bs-target="#edit-infos">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>

      <div id="edit-infos" class="collapse">
        <div class="form-group infos p-4 my-3">

          <div class="row">
            <div class="col">
              <label for="firstname">Prénom</label>
              <input type="text" class="form-control text-input mb-2" name="firstname" id="firstname"
                v-model=user!.firstname :class="{ error: !isEnoughFirstname }">
            </div>
            <div class="col">
              <label for="lastname">Nom</label>
              <input type="text" class="form-control text-input mb-2" name="lastname" id="lastname"
                v-model=user!.lastname :class="{ error: !isEnoughLastname }">
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="username">Nom d'utilisateur</label>
              <input type="text" class="form-control text-input mb-2" name="username" id="username"
                v-model=user!.username :class="{ error: !isEnoughUsername }">
            </div>
            <div class="col">
              <label for="phoneNumber">Téléphone</label>
              <input type="text" class="form-control text-input mb-2" name="phoneNumber" id="phoneNumber" v-model=user!.phoneNumber
                v-maska data-maska="(###) ###-####" :class="{ error: !isEnoughNumberPhone }">
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <label for="age">Tranche d'age</label>
              <select name="age" id="age" class="form-select text-input" v-model="user!.age">
                <option value="0">Entrez une tranche d'age</option>
                <option value="1">moins de 18 ans</option>
                <option value="2">entre 18 et 25 ans</option>
                <option value="3">de 25 à 65 ans</option>
                <option value="4">65 ans et plus</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button @click="updateUserInfos()" class="btn btn-warning" data-bs-toggle="collapse" id="btnEdit"
              data-bs-target="#edit-infos"
              :disabled="!isEnoughFirstname || !isEnoughLastname || !isEnoughNumberPhone || !isEnoughUsername">Modifier
            </button>
          </div>

        </div>
      </div>
    </main>
  </div>
  <hr>
</template>

<style lang="scss" scoped>
label {
  min-width: 300px;
}

.round {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--light-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  font-size: 2.1rem;
  font-weight: 800;
}

.edit-btn {
  border: none;
  font-size: 1.2rem;
}

#edit-infos {
  max-width: 100%;
}

.infos {
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
