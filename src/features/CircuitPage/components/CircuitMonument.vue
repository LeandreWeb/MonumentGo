<script setup lang="ts">
import type { MonumentInterface } from "@/shared/interfaces/index";

defineProps<{ monument: MonumentInterface, index: number }>();

</script>

<template>
  <main class="d-flex m-2 position-relative circuit-monument-card">

    <div class="d-flex align-items-center index">
      <h5 class="mx-auto mb-0 px-1">{{ index + 1 }}</h5>
    </div>

    <RouterLink :to="`/monuments/${monument.id}`" class="circuitMonument-link">
      <img :src="monument.mainPhoto" class="circuitMonument-img" />
      <h3 class="position-absolute top-0 end-0 circuitMonument-name m-2 me-auto px-2 text-end">{{ monument.name }}
      </h3>
    </RouterLink>

    <div class="circuitMonument-infos d-flex flex-column">
      <div class="m-2 circuitMonument-address mt-auto pb-1 text-end">

        <p class="mb-0">{{ monument.civicNumber }} {{ monument.street }}</p>
        <p class="mb-0">{{ monument.city }}</p>
        <strong class="circuitMonument-year">Année: {{ monument.year }}</strong>

      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
.circuit-monument-card {
  height: 160px;
  border-radius: 10px;
  background-color: var(--text-light-color);
}

.circuitMonument-img {
  height: 100%;
  width: 160px;
  object-fit: cover;
}

.circuitMonument-name {
  background-color: var(--transparent-light-background);
}

.circuitMonument-link {
  &:hover {
    color: var(--primary-color);
  }
}

.circuitMonument-infos {
  width: 100%;
}

.index {
  width: 10%;
  background-color: var(--primary-color-dark);
  border-radius: 10px 0 0 10px;

  h5 {
    color: var(--text-light-color);
  }
}

@media (max-width: 500px) {
  .circuit-monument-card {
    margin: 5px !important;
    padding: 5px !important;
  }

  h3 {
    font-size: 1.1rem;
  }

  .circuitMonument-img {
    width: 120px;
  }

}
</style>
