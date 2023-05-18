<script setup lang="ts">
import AdminEditCircuit from "./AdminEditCircuit.vue";
import type { CircuitInterface } from "@/shared/interfaces/index";


const props = defineProps<{
  circuit: CircuitInterface,
  index: number
}>();


</script>

<template>
  <main class="d-flex flex-column border">

    <div class="d-flex min-height">

      <div class="circuit-img-container">
        <img src="https://picsum.photos/id/193/150/100" class="circuit-img" />
        <img src="https://picsum.photos/id/194/150/100" class="circuit-img" />
        <img src="https://picsum.photos/id/195/150/100" class="circuit-img" />
        <img src="https://picsum.photos/id/196/150/100" class="circuit-img" />
      </div>

      <div class="d-flex justify-content-between w-100">

        <div class="d-flex flex-column justify-content-between p-2 ps-2">
          <strong class="mb-1">{{ circuit.name }}</strong>
          <div class="d-flex flex-column">
            <!-- <strong class="mb-0">Nombre d'arrêts: <span class="fw-normal">{{ circuit.stopQty }}</span></strong> -->
            <strong class="mb-0">Nombre d'arrêts: <span class="fw-normal">8</span></strong>
            <!-- <strong class="mb-0">Longueur du circuit: <span class="fw-normal">{{ circuit.kmLength }} km</span></strong> -->
            <strong class="mb-0">Longueur du circuit: <span class="fw-normal">5 km</span></strong>
          </div>
        </div>

        <div class="m-2 me-4 d-flex align-items-center">
          <button class="btn p-0 edit-btn" data-bs-toggle="collapse" :data-bs-target="'#edit-circuit-' + index">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn p-0 admin-list-delete-btn ms-3" data-bs-toggle="collapse"
            :data-bs-target="'#delete-circuit-' + index">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

      </div>

    </div>

    <div :id="`edit-circuit-${index}`" class="collapse">
      <div class="p-2 mt-2">
        <AdminEditCircuit :circuit="circuit" :index="index"/>
      </div>
    </div>

    <div :id="`delete-circuit-${index}`" class="collapse m-2">
      <div class="d-flex justify-content-end align-items-baseline">
        <h5 class="me-3">Voulez-vous vraiment supprimer ce circuit ?</h5>
        <!-- <button @click="deleteCircuit(index)" class="btn btn-danger" data-bs-toggle="collapse"
          :data-bs-target="'#delete-circuit-' + index">Supprimer</button> -->
        <button class="btn btn-danger" data-bs-toggle="collapse"
          :data-bs-target="'#delete-circuit-' + index">Supprimer</button>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
.min-height {
  min-height: 120px;
}

.circuit-img {
  min-height: 60px;
  width: 60px;
  object-fit: cover;
}

.circuit-img-container {
  min-width: 120px;
  max-width: 120px;
  height: 100%;
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

</style>
