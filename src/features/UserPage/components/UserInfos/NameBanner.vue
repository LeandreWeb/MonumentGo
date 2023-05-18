<script setup lang="ts">
import { useUser } from "@/shared/stores";

const userStore = useUser()

</script>

<template>
  <div class="banner row">
    <div class="pt-4">
      <div class="d-flex justify-content-between">
        <h1 class="ms-3">Bienvenue {{ userStore.getCurrentUser.firstname}} {{ userStore.getCurrentUser.lastname }}</h1>
        <button class="btn deconnect-btn mx-3 py-0" @click="userStore.logoutUser()">Déconnection</button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.banner {
  height: 120px;
  background: linear-gradient(to right, transparent, var(--light-gray-gradient));
}

.deconnect-btn {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  color: #495057;

  &:hover {
    background-color: #e9ecef;
    border-color: #e2e6ea;
    color: #212529;
  }
}

@media (max-width: 991px) {
  .banner {
    height: 110px;

    h1 {
      font-size: 1.5rem !important;
    }
  }

  @media (max-width: 300px) {
    .banner h1 {
      font-size: 1rem !important;
    }
  }
}
</style>
