<script setup lang="ts">
import MonumentsSort from "./MonumentsSort.vue";
import Monument from "./Monument.vue";
import DropFilter from "../DropFilter.vue";
import { useMonuments } from "@/shared/stores";

const monumentsStore = useMonuments();

function setMonumentsLimited() {
  monumentsStore.limit += 10;
  monumentsStore.setMonumentsLimited();
}

let timeoutId;
let isFetching = false;

function onscroll(event: Event) {
  clearTimeout(timeoutId);

  const element = event.target as HTMLElement;
  const scrollHeight = element.scrollHeight;
  const scrollTop = element.scrollTop;
  const clientHeight = element.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
    isFetching = true;

    timeoutId = setTimeout(() => {
      setMonumentsLimited();
      // console.log("scrolling");

      isFetching = false;
    }, 1000);
  }
};

</script>

<template>
  <aside @scroll="onscroll" class="position-absolute top-0 start-0 monument-list">

    <div id="drop-monument-list" class="collapse card d-block border-0 border-end rounded-0">

      <a href="#" class="title sticky-top" data-bs-toggle="collapse" data-bs-target="#collapse-drop-monument-list">
        <header class="card-header text-center rounded-0 border-0"><b> Liste des monuments </b></header>
      </a>
      <div id="collapse-drop-monument-list" class="collapse show">

        <div class="d-flex flex-column">
          <DropFilter class="hidden" />
          <MonumentsSort />

          <div v-if="monumentsStore.getMonumentsFiltered.length > 0">
            <div v-for="(monument, index) in monumentsStore.getMonumentsLimited" :key="monument.id">
              <Monument :index="index" :monument="monument" />
            </div>
            <h5 v-if="monumentsStore.getMonumentsFiltered.length > monumentsStore.limit" class="text-center m-2 my-4">
              Chargement...
            </h5>
          </div>
          <div v-else class="row">
            <div class="col-12">
              <h3 class="text-center mt-3">Aucun résultat</h3>
            </div>
          </div>

          <!-- Version avec bouton de pagination -->
          <!-- <div v-if="monumentsStore.monumentgetMonumentsFilteredsFiltered.length > 0">
              <Monument v-for="(monument, index) in monumentsStore.getMonumentsLimited" :key="monument.id" :index="index"
                :monument="monument" />
            </div>
            <div v-else class="row">
              <div class="col-12">
                <h3 class="text-center mt-3">Aucun résultat</h3>
              </div>
            </div>
            <button v-if="monumentsStore.getMonumentsFiltered.length > monumentsStore.limit" @click="setMonumentsLimited()"
              class="btn btn-success load-more-btn">Charger plus de monuments
            </button> -->

        </div>

      </div>

    </div>
  </aside>
</template>

<style lang="scss" scoped>
.monument-list {
  max-height: calc(100vh - 70px);
  width: 30%;
  min-width: 350px;
  max-width: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.monument-list::-webkit-scrollbar {
  display: none;
}

.card-header {
  border-radius: none !important;
  padding: 10px !important;
  font-size: 1.3rem;
  background-color: var(--primary-color);
  color: var(--text-light-color);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: var(--primary-color-dark);

    b {
      color: var(--text-light-color);
    }
  }
}

#drop-monument-list {
  box-shadow: 10px 0 5px -2px rgba(0, 0, 0, 1) !important;
  background-color: var(--text-light-color);
  z-index: 10;
}

.load-more-btn {
  width: fit-content;
  margin: 20px auto;
}

@media (min-width: 1091px) {
  .hidden {
    display: none;
  }
}

@media (max-width: 425px) {
  .monument-list {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
