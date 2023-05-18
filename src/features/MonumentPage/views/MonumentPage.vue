<script setup lang="ts">
import Images from "../components/Images.vue";
import Description from "../components/Description.vue";
import History from "../components/History.vue";
import Exclusive from "../components/Exclusive.vue";
import Reviews from "../components/Reviews.vue";
import Near from "../components/Near.vue";
import LinkedCircuits from "../components/LinkedCircuits.vue";

import { useMonuments, useUser } from "@/shared/stores";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();
const monumentStore = useMonuments();
const userStore = useUser();

async function loadMonument(id: string) {
  await monumentStore.setMonumentById(id);
  await userStore.IsMonumentVisitedByUser(id);
}

loadMonument(route.params.id as string);

watch(() => route.params.id, (newId, oldId) => {
  loadMonument(newId as string);
});

</script>

<template>
  <div class="row content">
    <div v-if="monumentStore.getMonumentById.city != undefined" class="px-0 background">
      <Images />
      <Description />
      <History />
      <Exclusive />
      <Reviews />
      <Near />
      <LinkedCircuits />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  background-color: var(--light-color);
}
</style>
