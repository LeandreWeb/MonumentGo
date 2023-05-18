<script setup lang="ts">
import { useMonuments } from "@/shared/stores";
import { computed, reactive } from "vue";

const monumentStore = useMonuments();

const isCollapsed = reactive({ value: true });
const nearestMonument = computed(() => monumentStore.getNearMonuments);

</script>

<template>
  <section class="py-1">
    <div class="container">

      <div class="col justify-content-center">
        <div class="near">

          <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-near"
            @click="isCollapsed.value = !isCollapsed.value">
            <header class="card-header d-flex justify-content-between align-items-center">
              <h2>À Proximité</h2>
              <i class="icon-control fa"
                :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
              </i>
            </header>
          </a>

          <div id="collapse-near" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
            <div v-if="monumentStore.getMonumentById !== null && nearestMonument.length > 0" class="d-flex flex-wrap">
              <div v-for="nearMonum in nearestMonument" class="m-1">

                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center position-relative">
                    <RouterLink :to="`/monuments/${nearMonum.id}`" class="">
                      <img :src="nearMonum.mainPhoto" alt="" class="monument-small-img">
                      <p class="position-absolute bottom-0 start-0 img-monument-name mb-1 me-2 px-2">
                        {{ nearMonum.name }}</p>
                    </RouterLink>
                  </div>
                </div>

              </div>
            </div>
            <div v-else>
              <p id="empty" >Il n'y a aucun monument à proximité.</p>
            </div>
          </div>

        </div>
        <hr>

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

.img-monument-name {
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



















