<script setup lang="ts">
import { useMonuments } from "@/shared/stores";

const monumentStore = useMonuments();

</script>

<template>
  <main class="col mb-4" id="search-sort">

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">

      <div class="d-flex flex-column flex-md-row search-bar">
        <label for="search" class="col m-1">
          <h5>Rechercher</h5>
          <!-- <input v-model="monumentStore.getFilters.searchBar" type="search" name="search" id="search"
            class="form-control text-input" placeholder="Rechercher un circuit"
            @input="monumentStore.searchBar(($event.target as HTMLInputElement).value)" /> -->
          <input type="search" name="search" id="search"
            class="form-control text-input" placeholder="Rechercher un circuit"/>
        </label>
      </div>

      <label for="qty" class="m-1">
        <h5>Qty par page</h5>
        <!-- <select name="qty" id="qty" class="form-select text-input"
          @change="itemStore.changeItemsQtyPerPage(+($event.target as HTMLInputElement).value)">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select> -->
        <select name="qty" id="qty" class="form-select text-input">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </label>

    </div>

  </main>
</template>

<style lang="scss" scoped>
.text-input {
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: transparent;
  margin-bottom: 5px;
}

.search-bar {
  width: 45% !important;
}

.sort-qty {
  width: 45% !important;
}

@media (max-width: 768px) {
  .search-bar {
    width: 100% !important;
  }

  .sort-qty {
    width: 100% !important;
  }
}
</style>