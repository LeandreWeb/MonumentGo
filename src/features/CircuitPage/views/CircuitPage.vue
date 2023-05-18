<script setup lang="ts">
import CircuitMonumentsList from "../components/CircuitMonumentsList.vue";
import { useCircuits } from "@/shared/stores";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const circuitsStore = useCircuits();
const route = useRoute();
 
async function loadCircuit(id: string) {
  await Promise.all([
    circuitsStore.setCircuitById(id),
  ]);
}

onMounted(() => {
  loadCircuit(route.params.id as string);
});

</script>

<template>
  <div class="row content">
    <CircuitMonumentsList />
  </div>
</template>

<style lang="scss" scoped>
.content {
  font-family: 'Raleway', sans-serif;
  min-height: calc(100vh - 290px);
  background: linear-gradient(150deg, var(--white-color) 70%, var(--primary-color-2) 10%, var(--primary-color-dark) 100%);
}
</style>
