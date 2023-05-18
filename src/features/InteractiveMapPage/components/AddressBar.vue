<script setup lang="ts">
import { useMonuments } from "@/shared/stores";

const monumentStore = useMonuments();

</script>

<template>
  <aside class="position-absolute top-0 end-0 search-address pt-1">

    <div id="search-bar" class="">
      <div class="input-group">
        <input  type="search" minlength="3" class="form-control"
          placeholder="Adresse de départ" />
        <!-- <input v-model="itemStore.getFilters.searchBar" type="search" minlength="3" class="form-control"
          placeholder="Adresse de départ" @blur="itemStore.searchBar(($event.target as HTMLInputElement).value)" /> -->
        <button @click="$event.preventDefault()" class="btn btn-success">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>

  </aside>
</template>

<style lang="scss" scoped>
#search-bar {
  width: 100%;
  opacity: 0.8;
}

.search-address {
  width: 40vw;
  max-width: 400px;
  top: 30px !important;
  left: 480px !important;
}

@media (max-width: 1250px) {
  .search-address {
    left: 410px !important;
    width: 300px;
  }
}

@media (max-width: 1090px) {
  .search-address {
    position: static !important;
    width: 93%;
    margin: 5px !important;
  }

  .search-address :first-child {
    margin-top: 0 !important;
  }

  #search-bar {
    opacity: 1;
    margin: 5px !important;
  }
}
</style>
