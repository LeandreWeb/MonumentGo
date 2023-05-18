<script setup lang="ts">
import { useMonuments, useUser } from "@/shared/stores";
import { computed, reactive, ref } from "vue";

const monumentStore = useMonuments();
const userStore = useUser();

const isCollapsed = reactive({ value: true });
const monument = computed(() => monumentStore.getMonumentById);
const modalExclusivePhotoLink = ref("");

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

</script>

<template>
  <section class="py-1">
    <div class="container">

      <div class="col justify-content-center">

        <div class="exclusive">
          <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-exclusive"
            @click="isCollapsed.value = !isCollapsed.value">
            <header class="card-header d-flex justify-content-between align-items-center">
              <h2>Contenu Exclusif</h2>
              <i class="icon-control fa"
                :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
              </i>
            </header>
          </a>

          <div id="collapse-exclusive" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">

            <div v-if="monument.exclusivePhotos.length > 0" class="d-flex flex-wrap">
              <div v-if="userStore.getCurrentUser.connectionState !== 0 && userStore.getIsVisited" class="d-flex flex-wrap">

                <div v-for="exclusivePhotoLink of monument.exclusivePhotos" class="m-1">
                  <button class="btn img-btn p-0 m-0" data-bs-toggle="modal" data-bs-target="#modal-exclusive-img"
                    @click="modalExclusivePhotoLink = exclusivePhotoLink">
                    <img :src=exclusivePhotoLink alt="" class="monument-exclusive-img">
                  </button>
                </div>

              </div>
              <div v-else>
                <p>Vous devez avoir visité ce monument pour accéder à son contenu exclusif</p>
              </div>
            </div>

            <div v-else-if="userStore.getCurrentUser.connectionState != 0">
              <p>Il n'y a aucun contenu exclusif associé à ce monument pour l'instant !</p>
            </div>
            <div v-else>
              <p>Vous devez être connecté pour accéder à ce contenu exclusif !</p>
            </div>
          </div>

          <div id="modal-exclusive-img" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
              <img :src=modalExclusivePhotoLink alt="" class="modal-img">
            </div>
          </div>

        </div>
      </div>
      <hr>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.monument-exclusive-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  box-shadow: 0 0 3px #00000046;

  &:hover {
    opacity: 0.85;
    transition: 0.3s;
  }
}

.img-btn {
  height: 100%;
  width: 100%;
  background-color: transparent !important;
  border: none;
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

@media (max-width: 577px) {

  .modal-dialog-centered,
  .modal-dialog,
  .modal-xl {
    margin: 0 auto !important;
  }
}
</style>

