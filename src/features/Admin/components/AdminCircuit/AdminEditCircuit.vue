<script setup lang="ts">
import { useMonuments } from "@/shared/stores";

const monumentStore = useMonuments();

const props = defineProps<{
  circuit: any;
  index: number;
}>();

</script>

<template>
  <main class="col" id="edit-circuit">

      <div class="circuit-infos">
        <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
          <label for="name" class="col-md-6 m-1">
            <h5>Nom du Circuit</h5>
            <input v-model="circuit.name" type="text" name="name" id="name" class="form-control text-input">
          </label>
          <label for="qty-poi" class="col-md-2 m-1">
            <h5>Nombre d'arrêts</h5>
            <input v-model="circuit.rating" type="text" name="qty-poi" id="qty-poi" disabled class="form-control">
          </label>
          <label for="length" class="col-md-3 m-1">
            <h5>Longueur du circuit (km)</h5>
            <input v-model="circuit.rating" type="text" name="length" id="length" disabled class="form-control">
          </label>
        </div>
      </div>
      <br>

      <div class="circuit-description">
        <h4>Description</h4>
        <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
          <label for="description" class="col-md-12 m-1">
            <textarea v-model="circuit.shortDescription" name="description" id="description" cols="30" rows="4" placeholder="Description du circuit"
              class="form-control text-input"></textarea>
          </label>
        </div>
      </div>
      <br>

      <div class="circuit-monuments">
        <h4>Monuments</h4>
        <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2 mb-4">

          <label for="monuments" class="col-md-12 m-1">
            <select name="monuments" id="monuments" class="form-select text-input">
              <option value="0">Sélectionner un monument</option>
              <option v-for="monument, index of monumentStore.getMonuments" :key="index" :value="monument.sku">
                {{ monument.name }}
              </option>
            </select>
          </label>

          <button class="btn btn-warning add-monument-btn">Ajouter Monument</button>

        </div>

        <div v-for="monument, index of monumentStore.getMonuments" :key="monument.sku" :monument="monument"
          class="circuit-monuments-list">

          <div class="d-flex flex-column border">
            <div class="d-flex min-height">

              <div class="order d-flex align-items-center justify-content-center p-2">
                {{ index + 1 }}
              </div>

              <div>
                <img src="https://picsum.photos/id/193/150/100" class="circuit-img" />
              </div>

              <div class="d-flex justify-content-between w-100">

                <div class="d-flex flex-column p-1 ps-2">
                  <strong class="mb-1">{{ monument.name }}</strong>
                  <strong class="mb-0">Adresse: <span class="fw-normal"> {{ monument.customerReviewCount }} {{
                    monument.name.slice(0,
                      20) }}, {{ monument.category + monument.brand }}, {{ monument.rating }}</span></strong>
                  <strong class="mb-0">Année: <span class="fw-normal"> {{ monument.retailPrice.toFixed(2)
                  }}</span></strong>
                </div>

                <div class="m-2 me-4 d-flex align-items-center">
                  <button class="btn p-0 admin-list-delete-btn" data-bs-toggle="collapse"
                    :data-bs-target="'#delete-circuit-monument-' + index">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>

              </div>
            </div>

            <div :id="`delete-circuit-monument-${index}`" class="collapse m-2">
              <div class="d-flex justify-content-end align-items-baseline">
                <h5 class="me-3">Voulez-vous vraiment supprimer ce monument ?</h5>
                <button class="btn btn-danger" data-bs-toggle="collapse"
                  :data-bs-target="'#delete-circuit-monument-' + index">Supprimer</button>
              </div>
            </div>

          </div>

        </div>
      </div>

      <hr>
      <div class="text-end">
        <button class="btn btn-warning add-circuit-btn">
          Confirmer Modification
        </button>
      </div>

  </main>
</template>

<style lang="scss" scoped>
.admin-list-delete-btn {
  border: none;
  width: 26px;
  height: 26px;
  font-size: 1.2rem;
}

.admin-list-delete-btn:hover {
  color: var(--danger-color);
}

.admin-list-delete-btn:hover {
  display: block;
}

.btn-danger {
  font-size: 0.9rem;
}

.text-input {
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: transparent;
  margin-bottom: 5px;
}

hr {
  border: none;
  border-bottom: 3px solid #8a8a8a;
}

#multiple-exclusives-photos-input,
#multiple-photos-input {
  width: 50%;
  min-width: 250px;
}

.btn-danger {
  font-size: 0.9rem;
}

.text-input {
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: transparent;
  margin-bottom: 5px;
}

.min-height {
  min-height: 100px;
}

.circuit-img {
  min-height: 100px;
  width: 100px;
  object-fit: cover;
}

.fa-trash:hover {
  color: var(--danger-color);
}

.admin-list-delete-btn {
  border: none;
  font-size: 1.1rem;
}

.order {
  width: 53px;
}
</style>


