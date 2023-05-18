<script setup lang="ts">
import { useMonuments } from "@/shared/stores";

import { ref } from "vue";

const monumentStore = useMonuments();

const filters = monumentStore.getMonumentsFilters;
const rangeValue = ref(filters.kmRange);

function setRange(event: Event) {
  filters.kmRange = +(event.target as HTMLInputElement).value;
  rangeValue.value = filters.kmRange;
}

function addZeroes(num) {
  num = num.toString();
  const dec = num.split('.')[1]
  const len = dec && dec.length > 2 ? dec.length : 2
  return Number(num).toFixed(len)
}

</script>

<template>
  <aside class="position-absolute top-0 end-0 filters">

    <div id="drop-filter" class="collapse card d-block border-0 rounded-0">

      <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-drop-filter">
        <header class="card-header rounded-0 border-0 text-center"><b> Filtres </b></header>
      </a>
      <div id="collapse-drop-filter" class="collapse">
        <div class="card-body">

          <div class="d-flex flex-column">

            <div class="kmrange text-center">
              <label id="km-range-label" for="kmrange">Rayon de recherche: <b>{{ addZeroes(rangeValue) }} km</b></label>
              <input type="range" id="kmrange" @change="setRange" name="kmrange" min="0.250" max="10" step="0.250"
                v-model="rangeValue">
            </div>

            <button @click="filters.favorite = !filters.favorite, monumentStore.filterMonuments()" class="btn me-auto">
              <i class="fa-heart fs-5" :class="filters.favorite ? 'fa-solid' : 'fa-regular'"></i>
              <span>Favoris</span>
            </button>

            <button @click="filters.toSee = !filters.toSee, monumentStore.filterMonuments()" class="btn me-auto">
              <i class="fa-bookmark fs-5" :class="filters.toSee ? 'fa-solid' : 'fa-regular'"></i>
              <span> À voir</span>
            </button>

            <button @click="filters.visited = !filters.visited, monumentStore.filterMonuments()" class="btn me-auto">
              <i class="fa-circle-check fs-5" :class="filters.visited ? 'fa-solid' : 'fa-regular'"></i>
              Visités
            </button>

            <button @click="filters.notVisited = !filters.notVisited, monumentStore.filterMonuments()" class="btn me-auto">
              <i class="fa-eye-slash fs-5" :class="filters.notVisited ? 'fa-solid' : 'fa-regular'"></i>
              Non visités
            </button>

          </div>

        </div>
      </div>
    </div>

  </aside>
</template>

<style lang="scss" scoped>
#drop-filter {
  width: 300px;
}

#kmrange {
  width: 100%;
}

.card-header {
  border-radius: none !important;
  padding: 10px !important;
  box-shadow: 0 1px 0.5rem rgba(0, 0, 0, 0.2);
}

.filters {
  top: 30px !important;
  right: 30px !important;
}

button {
  width: 100%;
  text-align: start;
  margin: 5px !important;
  border: none !important;
}

.fa-solid {
  color: var(--primary-color) !important;
}

.fa-regular {
  color: var(--dark-text-color-2) !important;
}

.fa-heart {
  padding: 0 30px 0 0;
}

.fa-bookmark {
  padding: 0 29px 0 2px;
}

.fa-circle-check {
  padding: 0 28px 0 0;
}

.fa-eye-slash {
  padding: 0 25px 0 0;
}


@media (max-width: 1090px) {
  .filters {
    position: static !important;
    width: 93%;
    margin: 5px !important;
    justify-content: center;
  }

  .filters :first-child {
    margin-top: 0 !important;
  }

  #drop-filter {
    width: 100%;
    margin: 5px !important;
  }
}
</style>
