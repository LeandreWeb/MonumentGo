<script setup lang="ts">
import { useUser, useMonuments } from "@/shared/stores";
import { ref, computed, reactive } from "vue";

const monumentStore = useMonuments();

const circuits = computed(() => monumentStore.getMonumentCircuits)
const isCollapsed = reactive({ value: true });

</script>

<template>
  <section class="py-1">
    <div class="container">

      <div class="col justify-content-center">

        <div class="linked-circuit">

          <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-linked-circuit"
            @click="isCollapsed.value = !isCollapsed.value">
            <header class="card-header d-flex justify-content-between align-items-center">
              <h2>Circuits en Lien</h2>
              <i class="icon-control fa"
                :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
              </i>
            </header>
          </a>

          <div id="collapse-linked-circuit"
            :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
            <div v-if="circuits != null" class="d-flex flex-wrap">
              <div v-for="generatedCircuit in monumentStore.getMonumentCircuits" class="m-1">
                
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center position-relative">
                    <RouterLink :to="`/circuits/${generatedCircuit.id}`" class=""><img :src=generatedCircuit.mainPhoto talt=""
                        class="monument-small-img">
                    </RouterLink>
                    <div class="position-absolute bottom-0 end-0 start-0 mb-1 me-2">
                      <p class="img-circuit-name mb-0">{{ generatedCircuit.name }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div v-else >
              <p>Il n'y a aucun circuits associer à ce monument</p>
            </div>
          </div>
          
        </div>
        <br>

      </div>
    </div>
  </section>
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



