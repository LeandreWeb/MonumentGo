<script setup lang="ts">
import { useUser } from "@/shared/stores";
import { reactive } from "vue";

const userStore = useUser();

const isCollapsed = reactive({ value: false });

</script>

<template>
  <main class="col" id="circuit-made">

    <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-circuit-made"
      @click="isCollapsed.value = !isCollapsed.value">
      <header class="card-header d-flex justify-content-between align-items-center">
        <h2>Circuits Réalisés</h2>
        <i class="icon-control fa" :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
        </i>
      </header>
    </a>

    <div id="collapse-circuit-made" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">

      <div v-if="userStore.currentUser !== null && userStore.getCurrentUser.finishedCircuits != null" class="d-flex flex-wrap">
        <div v-for=" (finishedCircuit, index) of userStore.getCurrentUser.finishedCircuits" :key="finishedCircuit.id"
          class="m-1">

          <div class="d-flex justify-content-between">

            <div class="d-flex align-items-center position-relative">
              <RouterLink :to="`/circuits/${finishedCircuit.id}`">
                <img :src="finishedCircuit.mainPhoto" alt="" class="monument-small-img">
              </RouterLink>

              <div class="position-absolute bottom-0 end-0 start-0 mb-1 me-2">
                <p class="img-circuit-name mb-0">{{ finishedCircuit.name }}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div class="mb-1" v-else>Vous n'avez encore aucun circuits de complété</div>

    </div>

  </main>
  <hr class="mt-4">
</template>

<style lang="scss" scoped>
.monument-small-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  box-shadow: 0 0 3px #00000046;

  &:hover {
    opacity: 0.85;
    transition: 0.3s;
  }
}

.img-circuit-name {
  max-width: fit-content;
  max-height: 45px;
  font-size: 0.8rem;
  color: var(--text-light-color);
  background-color: #00000083;
  padding: 0.2rem 0.2rem;
  overflow: hidden;

  &:hover {
    max-height: unset;
    overflow: visible;
  }
}
</style>
