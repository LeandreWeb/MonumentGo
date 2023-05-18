<script setup lang="ts">
import { useMonuments } from "@/shared/stores";

const monumentStore = useMonuments();

</script>

<template>
  <header class="d-sm-flex align-items-center border-bottom pb-1">
    <div class="text-end ms-auto">
      <label for="sort-monument">Trié par 
      <select id="sort-monument" class="form-select d-inline-block w-auto me-2 my-2"
        @change="monumentStore.sortMonuments(($event.target as HTMLInputElement).value)">
        <option value="distance" selected>distance</option>
        <option value="likes">les plus aimés</option>
      </select>
    </label>
    </div>
  </header>
</template>

<style lang="scss" scoped>

</style>
