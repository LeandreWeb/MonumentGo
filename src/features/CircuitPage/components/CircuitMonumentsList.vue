<script setup lang="ts">
import CircuitMonument from "./CircuitMonument.vue";
import { useCircuits } from "@/shared/stores";
import { computed } from "vue";

const circuitsStore = useCircuits();

const circuit = computed(() => circuitsStore.getCircuitById);

</script>

<template>
  <main>
    <div v-if="circuit.monuments.length > 0" class="content px-4 mb-4">

      <h2 class="text-center my-4">{{ circuit.name }}</h2>

      <div class="d-flex circuit-description">
        <!-- <p class="m-3">{{ circuit.description }}</p> -->
        <p v-html="circuit.description" class="m-3"></p>
      </div>

      <h3 class="text-center my-4">Liste des monuments du circuit ( {{ circuit.monuments.length }} )</h3>

      <div class="d-flex flex-wrap p-4 my-4 circuit-monuments-list">
        <div v-for="(monument, index) in circuit.monuments" :key="index" class="w-50 min-width">
          <CircuitMonument :index="index" :monument="monument" />
        </div>
      </div>

    </div>
    <div v-else class="row">
      <div class="col-12">
        <h3 class="text-center mt-3">Chargement...</h3>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.circuit-monuments-list {
  background-color: var(--light-gray-background);
  border-radius: 10px;
  margin: 0 auto;
  max-width: 1200px;
}

.circuit-description {
  background-color: var(--light-gray-background);
  border-radius: 10px;
  margin: 0 auto;
  width: fit-content;
  max-width: 1200px;
  padding: 10px;
}

.min-width {
  min-width: 350px;
}

@media (max-width: 950px) {
  .circuit-monuments-list {
    flex-direction: column;
  }

  .min-width {
    width: 100% !important;
  }
}

@media (max-width: 600px) {
  .circuit-monuments-list {
    padding: 20px 5px !important;
  }

  .min-width {
    min-width: 100% !important;
  }

  .content {
    padding: 10px !important;
  }

  main {
    padding: 0 !important;}
}
</style>
