<script setup lang="ts">
import AdminBanner from "../components/AdminBanner.vue";
import AddMonument from "../components/AdminMonument/AddMonument.vue";
import AdminMonumentsList from "../components/AdminMonument/AdminMonumentsList.vue";
import AddCircuit from "../components/AdminCircuit/AddCircuit.vue";
import AdminCircuitsList from "../components/AdminCircuit/AdminCircuitsList.vue";
import SideMenu from "../components/SideMenu/SideMenu.vue";

import { useUser } from "@/shared/stores";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUser();

</script>

<template>
  <AdminBanner />
  <div class="row content">
    <SideMenu class="side-menu border-end pt-1" />
    <main class="col infos-list px-4 pb-4">
      <div class="col dropdowns py-4">
        <h2 class="text-center">Monuments</h2>
        <AdminMonumentsList />
        <AddMonument />
      </div>
      <div class="col dropdowns py-4">
        <h2 class="text-center">Circuits</h2>
        <AdminCircuitsList />
        <AddCircuit />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-height: calc(100vh - 170px);
}

.dropdowns {
  width: 100%;
  max-width: 1100px;
}

@media (min-width: 1200px) {
  .side-menu {
    max-width: 300px;
  }

  .infos-list {
    max-width: 1100px;
  }
}

@media (max-width: 1200px) {
  .side-menu {
    grid-area: menu;
  }

  .infos-list {
    grid-area: infos;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "menu infos";
  }

  .side-menu {
    width: 100% !important;
  }

  @media (max-width: 991px) {
    .content {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        "menu"
        "infos";
    }

    .side-menu {
      max-width: 100% !important;
    }
  }
}
</style>
