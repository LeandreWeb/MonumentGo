<script setup lang="ts">
import DropFilter from "./DropFilter.vue";
import MonumentsList from "./MonumentsList/MonumentsList.vue";
import Mapbox from "./Mapbox.vue"

</script>

<template>
  <main class="px-0 position-relative">

    <div class="map-content">
      <Mapbox />
    </div>
    <MonumentsList />
    <DropFilter class="hidden" />

  </main>
</template>

<style lang="scss" scoped>
.map-content {
  height: calc(100vh - 70px);
  width: 100%;
  background-color: #f5f5f5;

  img {
    height: 100%;
    width: 100%;
    object-fit: fill;
  }
}

@media (max-width: 1090px) {
  .hidden {
    display: none;
  }
}
</style>
