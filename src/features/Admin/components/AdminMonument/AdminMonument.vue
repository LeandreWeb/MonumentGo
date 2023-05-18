<script setup lang="ts">
import AdminEditMonument from "./AdminEditMonument.vue";
import type { MonumentInterface } from "@/shared/interfaces/index";


const props = defineProps<{
  monument: MonumentInterface,
  index: number
}>();


</script>

<template>
  <main class="d-flex flex-column border">

    <div class="d-flex min-height">

      <div>
        <img src="https://picsum.photos/id/193/150/100" class="monument-img" />
      </div>

      <div class="d-flex justify-content-between w-100">

        <div class="d-flex flex-column p-1 ps-2">
          <strong class="mb-1">{{ monument.name }}</strong>
          <strong class="mb-0">Adresse: <span class="fw-normal"> {{ monument.civicNumber }} {{
            monument.street }}, {{ monument.city }}, {{ monument.postalCode }}</span></strong>
          <strong class="mb-0">Année: <span class="fw-normal"> {{ monument.year }}</span></strong>
        </div>

        <div class="m-2 me-4 d-flex align-items-center">
          <button class="btn p-0 edit-btn" data-bs-toggle="collapse" :data-bs-target="'#edit-monument-' + index">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn p-0 admin-list-delete-btn ms-3" data-bs-toggle="collapse"
            :data-bs-target="'#delete-monument-' + index">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

      </div>

    </div>

    <div :id="`edit-monument-${index}`" class="collapse">
      <div class="p-2 mt-2">
        <AdminEditMonument :monument="monument" :index="index" />
      </div>
    </div>

    <div :id="`delete-monument-${index}`" class="collapse m-2">
      <div class="d-flex justify-content-end align-items-baseline">
        <h5 class="me-3">Voulez-vous vraiment supprimer ce monument ?</h5>
        <!-- <button @click="deleteMonument(index)" class="btn btn-danger" data-bs-toggle="collapse"
            :data-bs-target="'#delete-monument-' + index">Supprimer</button> -->
        <button class="btn btn-danger" data-bs-toggle="collapse"
          :data-bs-target="'#delete-monument-' + index">Supprimer</button>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
.min-height {
  min-height: 100px;
}

.monument-img {
  min-height: 100px;
  width: 100px;
  object-fit: cover;
}

.admin-list-delete-btn,
.edit-btn {
  border: none;
  font-size: 1.1rem;
}

.fa-trash:hover {
  color: var(--danger-color);
}

.fa-pen-to-square:hover {
  color: var(--primary-color);
}

.error {
  border-color: red !important;
}
</style>
