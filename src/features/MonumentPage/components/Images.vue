<script setup lang="ts">
import { useMonuments, useUser } from "@/shared/stores";
import { ref, computed } from "vue";

const monumentStore = useMonuments();
const userStore = useUser();

const monument = computed(() => monumentStore.getMonumentById);
const modalPhotoLink = ref("");

function closeModal() {
  const modal = document.querySelector('#modal-small-img');
  const backdrop = document.querySelector('.modal-backdrop');
  const modalOpen = document.querySelector('.modal-open');
  if (modal) modal.remove();
  if (backdrop) backdrop.remove();
  if (modalOpen) modalOpen.classList.remove('modal-open');

  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

window.addEventListener('popstate', closeModal);

function controlPlusOneLike() {
  if (userStore.getCurrentUser.favorites!.some((e) => e.id === monument.value.id)) {
    monument.value.likes = monument.value.likes - 1;
  } else {
    monument.value.likes = monument.value.likes + 1;
  }
}

function inToSeeList() {
  const user = userStore.getCurrentUser;
  if ((user.connectionState == 1 && user.toSee!.some((e) => e.id === monument.value.id))
    || (user.connectionState == 0 && user.toSee!.some((e) => e === monument.value.id))) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <section id="monument-images">
    <div class="container-fluid p-0">
      <div class="d-flex flex-wrap position-relative">

        <div class="col position-relative">
          <img :src=monument.mainPhoto class="cover-img" data-bs-toggle="modal" data-bs-target="#modal-small-img"
            @click="modalPhotoLink = monument.mainPhoto">
          <div class="likes position-absolute bottom-0 end-0 m-4 px-4 py-1">

            <button class="btn small-tosee-btn me-2 d-none" @click="userStore.toggleMonumentToSee(monument.id)">
              <span v-if="inToSeeList()" class="d-flex align-items-center justify-content-between">
                <strong class="me-2">Retirer </strong>
                <i class="fa-solid fa-minus-circle fs-3"></i>
              </span>
              <span v-else class="d-flex align-items-center justify-content-between">
                <strong class="me-2">À Voir</strong>
                <i class="fa-solid fa-plus-circle fs-3"></i>
              </span>
            </button>

            <strong class="likes-count me-1">{{ monument.likes }} J'aime </strong>
            <button v-if="userStore.getCurrentUser.connectionState != 0" class="btn like-btn"
              @click="userStore.toggleMonumentLike(monument.id), controlPlusOneLike()">
              <i class="fa-solid fa-heart"
                :class="userStore.getCurrentUser.favorites!.some((e) => e.id === monument.id) ? 'liked' : ''"></i>
            </button>
          </div>
        </div>

        <div class="position-absolute top-0 end-0 monument-infos d-flex flex-column align-items-end">
          <h1 class="m-2 monument-name me-auto">{{ monument.name }}</h1>
          <div class="m-2 monument-address text-end">
            <p class="mb-0">{{ monument.civicNumber }} {{ monument.street }}, {{ monument.city }}</p>
            <p class="mb-0">{{ monument.postalCode }}, {{ monument.province }}</p>
          </div>
          <div class="m-2">
            <strong class="monument-year">Année: {{ monument.year }}</strong>
          </div>
        </div>

        <div class="d-flex flex-column-reverse side-features">

          <div v-if="monument.photos.length > 0" class="d-flex flex-wrap side-images">
            <div v-for="photoLink of monument.photos" class="secondary-img-container">
              <button class="btn img-btn p-0 m-0" data-bs-toggle="modal" data-bs-target="#modal-small-img"
                @click="modalPhotoLink = photoLink">
                <img :src=photoLink alt="" class="secondary-img">
              </button>
            </div>
          </div>

          <div id="modal-small-img" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
              <img :src=modalPhotoLink alt="" class="modal-img">
            </div>
          </div>

          <button class="btn tosee-btn my-2 ms-auto" @click="userStore.toggleMonumentToSee(monument.id)">
            <span v-if="inToSeeList()">Retirer de votre liste À Voir <i class="fa-solid fa-minus-circle"></i></span>
            <span v-else> Ajouter à votre liste À Voir <i class="fa-solid fa-plus-circle"></i></span>
          </button>

        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.monument-infos {
  width: 60vw;
  max-width: 800px;
  padding: 1rem;
  margin-top: 1rem;
  // background-color: var(--transparent-medium-background);
  background-color: rgba(235, 235, 235, 0.6);
  font-family: 'Raleway', sans-serif;
}

.tosee-btn:active {
  transform: scale(0.99);
}

.tosee-btn {
  height: 45px;
  width: fit-content;
  min-width: 286px;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: transparent !important;
  border: none;

  span {
    &:hover {
     color: var(--primary-color-2);
    }
  }
}

.small-tosee-btn {
  width: fit-content;
  font-size: 1rem;
  font-weight: 600;
  background-color: transparent !important;
  border: none;

  span {
    &:hover {
     color: var(--primary-color-2);
    }
  }
}

.img-btn {
  height: 100%;
  width: 100%;
  background-color: transparent !important;
  border: none;
}

.cover-img {
  width: 100%;
  min-width: 58vw;
  min-height: 75vh;
  max-height: calc(100vh - 90px);
  object-fit: cover;
}

.secondary-img {
  width: 100%;
  min-width: 122px;
  height: 150px;
  object-fit: cover;
}

.secondary-img-container {
  width: 33.3%;
  height: 50%;
}

.side-images {
  min-width: 368px;
  width: 40vw;
  max-width: 450px;
  min-height: 150px;
  height: fit-content;
  max-height: 300px;
  overflow: scroll;
  overflow-x: hidden;
}

.side-images::-webkit-scrollbar {
  display: none;
}

.modal-img {
  height: 85vh;
  max-height: 90vh;
  max-width: 80vw;
  object-fit: contain;
}

.modal-xl {
  max-width: fit-content;
}

.monument-year {
  font-size: 1.2rem;
  font-weight: 600;
}

.monument-address {
  font-size: 1.3rem;
}

.likes {
  font-size: 1rem;
  background-color: var(--transparent-light-hover);
  border-radius: 50px;
}

.like-btn {
  background-color: var(--dark-gray-background);
  border: none;
  border-radius: 50%;
  padding: 0.3rem 0.55rem 0.05rem 0.5rem;
  margin: 0.3rem 0;
  font-size: 1.3rem;
  color: var(--light-gray-background);

  &:hover {
    color: var(--transparent-light-hover);
  }
}

.liked {
  color: var(--liked-color);
}

@media (max-width: 920px) {
  .monument-infos {
    width: 90vw;
  }

  .side-images,
  .side-features {
    width: 100% !important;
    max-width: 100% !important;
    min-width: unset;
  }

  .secondary-img-container {
    min-width: 140px;
    width: 100%;
    max-width: 20%;
  }

  .small-tosee-btn {
    display: inline !important;
  }

  .tosee-btn {
    display: none !important;
  }
}

@media (max-width: 717px) {
  .secondary-img-container {
    max-width: 25%;
  }
}

@media (max-width: 577px) {
  .secondary-img-container {
    max-width: 33.3%;
  }

  .modal-dialog-centered,
  .modal-dialog,
  .modal-xl {
    margin: 0 auto !important;
  }
}

@media (max-width: 438px) {
  .secondary-img-container {
    max-width: 50%;
  }

  .monument-address {
    font-size: 1.1rem;
  }
}
</style>
