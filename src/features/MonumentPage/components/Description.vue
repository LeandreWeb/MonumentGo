<script setup lang="ts">
import { useMonuments } from "@/shared/stores";
import { ref, computed, reactive } from "vue";

const monumentStore = useMonuments();

const monument = computed(() => monumentStore.getMonumentById);

const isCollapsed = reactive({ value: true });

</script>

<template>
  <section class="pt-5">
    <div class="container">

      <div class="col justify-content-center">
        <section class="resume">
          <p>{{monument.resume}}</p>
        </section>
        <hr>

        <div class="description">
          
          <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-description"
            @click="isCollapsed.value = !isCollapsed.value">
            <header class="card-header d-flex justify-content-between align-items-center">
              <h2>Description</h2>
              <i class="icon-control fa"
                :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
              </i>
            </header>
          </a>

          <div id="collapse-description" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
            <div v-if="monument !== null" class="d-flex flex-wrap">
              <p>{{monument.description}}</p>
            </div>
          </div>

        </div>
        <hr>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>





