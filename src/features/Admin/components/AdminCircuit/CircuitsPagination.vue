<script setup lang="ts">
import Paginate from "vuejs-paginate-next";
import { useMonuments } from "@/shared/stores";

const monumentStore = useMonuments();

</script>

<template>
  
  <div class="pagination my-4">
    <!-- <Paginate
      v-model="monumentStore.currentPage"
      :page-count="monumentStore.getNumberOfPages"
      :page-range="4"
      :margin-pages="1"
      :click-handler="monumentStore.changePage"
      :prev-text="'Précédent'"
      :next-text="'Suivant'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
    /> -->
  </div>

</template>

<style lang="scss" scoped>

</style>
