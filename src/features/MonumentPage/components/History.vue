<script setup lang="ts">
import { useMonuments } from "@/shared/stores";
import { ref, computed, reactive } from "vue";

const monumentStore = useMonuments();

const monument = computed(() => monumentStore.getMonumentById);

const isCollapsed = reactive({ value: true });

</script>

<template>
  <section class="py-1">
    <div class="container">

      <div class="col justify-content-center">

        <div class="history">

          <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-history"
            @click="isCollapsed.value = !isCollapsed.value">
            <header class="card-header d-flex justify-content-between align-items-center">
              <h2>Histoire</h2>
              <i class="icon-control fa"
                :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
              </i>
            </header>
          </a>

          <div id="collapse-history" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
            <div v-if="monument !== null" class="d-flex flex-wrap">
              <p>{{ monument.history }}</p>
            </div>
          </div>
          
        </div>
        <hr>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>




