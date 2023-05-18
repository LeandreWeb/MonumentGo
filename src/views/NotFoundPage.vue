<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// setTimeout(() => {
//   router.push("/");
// }, 4000);

</script>

<template>
  <div class="row content align-content-center mx-auto">
    <h1 class="d-flex justify-content-center text-center">
      Oups ! La page que vous tentez d'accéder n'existe pas !
    </h1>
    <RouterLink to="/" class="d-flex justify-content-center mt-2">
      <button class="btn btn-primary">Retourner à la page d'accueil</button>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-height: calc(100vh - 160px);
  max-width: 800px;
}
</style>
