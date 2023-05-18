<script setup lang="ts">
import { useMonuments } from "@/shared/stores";

const monumentStore = useMonuments();

const props = defineProps<{
  monument: any;
  index: number;
}>();

</script>

<template>
  <main class="col" id="edit-monument">



    <div class="monument-infos">
      <h4>Informations de base</h4>
      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="name" class="col-md-8 m-1">
          <h5>Nom</h5>
          <input v-model="monument.name" type="text" name="name" id="name" class="form-control text-input">
        </label>
        <label for="year" class="col-md-3 m-1">
          <h5>Année</h5>
          <input v-model="monument.retailPrice" type="text" name="year" id="year" class="form-control text-input">
        </label>
      </div>
    </div>
    <br>

    <div class="monument-address">
      <h4>Adresse</h4>

      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="number" class="col-md-3 m-1">
          <h5>Numéro</h5>
          <input v-model="monument.rating" type="text" name="number" id="number" class="form-control text-input">
        </label>
        <label for="street" class="col-md-8 m-1">
          <h5>Rue</h5>
          <input v-model="monument.brand" type="text" name="street" id="street" class="form-control text-input">
        </label>
      </div>

      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="city" class="col-md-8 m-1">
          <h5>Ville</h5>
          <input v-model="monument.brand" type="text" name="city" id="city" class="form-control text-input">
        </label>
        <label for="postalCode" class="col-md-3 m-1">
          <h5>Code postal</h5>
          <input v-model="monument.brand" type="text" name="postalCode" id="postalCode" class="form-control text-input">
        </label>
      </div>

      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="state" class="col-md-5 m-1">
          <h5>Province</h5>
          <input v-model="monument.brand" type="text" name="state" id="state" class="form-control text-input">
        </label>
        <label for="country" class="col-md-6 m-1">
          <h5>Pays</h5>
          <input v-model="monument.brand" type="text" name="country" id="country" class="form-control text-input">
        </label>
      </div>

    </div>
    <br>

    <div class="coordinates">
      <h4>Coordonnées géographiques</h4>
      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="latitude" class="col-md-5 m-1">
          <h5>Latitude</h5>
          <input v-model="monument.rating" type="text" name="latitude" id="latitude" class="form-control text-input">
        </label>
        <label for="longitude" class="col-md-6 m-1">
          <h5>Longitude</h5>
          <input v-model="monument.rating" type="text" name="longitude" id="longitude" class="form-control text-input">
        </label>
      </div>
    </div>
    <br>

    <div class="monument-resume">
      <h4>Résumé</h4>
      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="resume" class="col-md-12 m-1">
          <textarea v-model="monument.shortDescription" name="resume" id="resume" cols="30" rows="5"
            class="form-control text-input"></textarea>
        </label>
      </div>
    </div>
    <br>

    <div class="monument-description">
      <h4>Description</h4>
      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="description" class="col-md-12 m-1">
          <textarea v-model="monument.shortDescription" name="description" id="description" cols="30" rows="5"
            class="form-control text-input"></textarea>
        </label>
      </div>
    </div>
    <br>

    <div class="monument-history">
      <h4>Histoire</h4>
      <div class="d-flex flex-column flex-wrap flex-md-row justify-content-between px-2">
        <label for="history" class="col-md-12 m-1">
          <textarea v-model="monument.shortDescription" name="history" id="history" cols="30" rows="5"
            class="form-control text-input"></textarea>
        </label>
    </div>
  </div>
  <br>

  <div class="monument-photos">
      <h4>Photos</h4>
      <h5 class="ms-2">Ajouter les photos ici</h5>
      <div class="mb-3">
        <input class="form-control" type="file" id="multiple-exclusives-photos-input" multiple>
      </div>
      <div v-if="monument !== null" class="d-flex flex-wrap ms-3">
        <!-- <div class="m-1">
              <label for="multiple-photos-input"><img src="public/images/add-photo-btn.png" role="button"
                  class="monument-admin-img border">
                <input class="form-control" type="file" id="multiple-photos-input" multiple>
              </label>
            </div> -->
        <div v-for=" (photo, index) of monument" :key="index" class="m-1">

          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center position-relative">
              <RouterLink to="/" class="admin-list-img"><img src="https://via.placeholder.com/150" alt=""
                  class="monument-admin-img">
              </RouterLink>
              <button class="btn p-0 admin-list-delete-btn mt-1 me-1 admin-list-hide position-absolute top-0 end-0"
                data-bs-toggle="collapse" :data-bs-target="'#delete-photos-' + index">
                <i class="fa-solid fa-trash"></i>
              </button>
              <div :id="`delete-photos-${index}`" class="collapse position-absolute bottom-0 end-0 start-0 mb-1">
                <div class="text-center">
                  <button class="btn btn-danger p-1" data-bs-toggle="collapse"
                    :data-bs-target="'#delete-photos-' + index">Confirmer</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <hr class="mx-2">

    <div class="monument-exclusives-photos">
      <h4>Photos Exclusives</h4>
      <h5 class="ms-2">Ajouter les photos exclusives ici</h5>
      <div class="mb-3">
        <input class="form-control" type="file" id="multiple-exclusives-photos-input" multiple>
      </div>
      <div v-if="monument !== null" class="d-flex flex-wrap ms-3">
        <div v-for=" (exclusive, index) of monument" :key="index" class="m-1">

          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center position-relative">
              <RouterLink to="/" class="admin-list-img"><img src="https://via.placeholder.com/150" alt=""
                  class="monument-admin-img">
              </RouterLink>
              <button class="btn p-0 admin-list-delete-btn mt-1 me-1 admin-list-hide position-absolute top-0 end-0"
                data-bs-toggle="collapse" :data-bs-target="'#delete-exclusives-photos-' + index">
                <i class="fa-solid fa-trash"></i>
              </button>
              <div :id="`delete-exclusives-photos-${index}`"
                class="collapse position-absolute bottom-0 end-0 start-0 mb-1">
                <div class="text-center">
                  <button class="btn btn-danger p-1" data-bs-toggle="collapse"
                    :data-bs-target="'#delete-exclusives-photos-' + index">Confirmer</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <hr class="mx-2">

    <div class="text-end">
      <button class="btn btn-warning edit-monument-btn">
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

.admin-list-hide {
  display: none;
}

.admin-list-img:hover+.admin-list-hide,
.admin-list-delete-btn:hover {
  display: block;
}

.monument-admin-img:hover {
  opacity: 0.85;
}

.monument-admin-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.edit-monument-btn {
  width: 110px;
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
</style>


