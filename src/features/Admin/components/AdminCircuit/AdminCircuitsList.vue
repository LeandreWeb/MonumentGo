<script setup lang="ts">
import AdminCircuitSearchSort from "./AdminCircuitSearchSort.vue";
import AdminCircuit from "./AdminCircuit.vue";
import CircuitsPagination from "./CircuitsPagination.vue";

import { useMonuments } from "@/shared/stores";
import { reactive } from "vue";

const monumentStore = useMonuments();

const isCollapsed = reactive({ value: false });

</script>

<template>
  <main class="col" id="circuits-list">

    <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-circuits-list"
      @click="isCollapsed.value = !isCollapsed.value">
      <header class="card-header d-flex justify-content-between align-items-center mb-2">
        <h2>Liste des Circuits</h2>
        <i class="icon-control fa" :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
        </i>
      </header>
    </a>

    <div id="collapse-circuits-list" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
      <AdminCircuitSearchSort />
      <div v-if="monumentStore.getMonuments">
        <AdminCircuit v-for="circuit, index in monumentStore.getMonuments" :key="circuit.sku" :circuit="circuit" :index="index" />
      </div>
      <div v-else class="row">
        <h3 class="text-center mt-3">Aucun résultat</h3>
      </div>
      <CircuitsPagination />
    </div>

  </main>
</template>

<style lang="scss" scoped>
#collapse-circuits-list {
  background-color: var(--light-gray-background);
  border-radius: 15px;
  padding: 1.5rem;
}

.card-header {
  padding: 0.8rem 0.8rem 0.4rem;
  transition: all .2s ease-in;
  border-radius: 20px;

  &:hover {
    background-color: var(--light-gray-background);
  }
}
</style>