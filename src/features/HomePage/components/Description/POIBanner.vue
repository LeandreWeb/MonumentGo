<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const phonesImage = ref<HTMLElement | null>(null);

const handleScroll = () => {
  if (phonesImage.value !== null) {
    // obtenir la position de la div phones-image par rapport au haut de la page
    const phonesImagePosition = phonesImage.value.getBoundingClientRect().top;
    // obtenir la hauteur de la fenêtre
    const windowHeight = window.innerHeight;
    // calculer le pourcentage de la hauteur de la fenêtre qui est en haut de la div phones-image
    const percentVisible = Math.max(0, Math.min(1, (windowHeight - phonesImagePosition) / windowHeight * 1.5));
    // pour chaque image dans la div phones-image, mettre l'opacité en fonction du pourcentage visible
    const images = phonesImage.value.querySelectorAll('.fade-in');
    images.forEach((image) => {
      (image as HTMLElement).style.opacity = percentVisible.toString();
    });
  }
};

onMounted(() => {
  // écouter l'événement de scroll sur la fenêtre
  window.addEventListener('scroll', handleScroll);
  // appeler handleScroll une fois pour initialiser les images
  handleScroll();
});

onBeforeUnmount(() => {
  // retirer l'écouteur d'événement lorsqu'on démonte le composant
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <div class="poi-banner border-bottom py-3">
    <div class="d-flex justify-content-evenly poi-banner-content">

      <div class="phones-image position-relative" ref="phonesImage">
        <img src="/images/phone-preview-2.png" class="position-absolute fade-in">
        <img src="/images/phone-preview-1.png" class="position-absolute fade-in">
      </div>

      <div class="poi-cards">
        <h2 class="text-end fw-light mt-5">Des milliers de points d'intérêts</h2>
        <div class="cards">

          <div class="d-flex flex-wrap mt-4">
            <div class="card-container me-auto">
              <div class="d-flex flex-column align-items-center">
                <i class="fa-solid fa-tree-city"></i>
                <h1 class="fw-semibold">+100</h1>
                <h5 class="fw-light">Municipalités</h5>
              </div>
            </div>
            <div class="card-container me-auto">
              <div class="d-flex flex-column align-items-center">
                <i class="fa-solid fa-monument"></i>
                <h1 class="fw-semibold">+600</h1>
                <h5 class="fw-light">Statuts</h5>
              </div>
            </div>
          </div>

          <div class="d-flex flex-wrap mt-5">
            <div class="card-container ms-auto">
              <div class="d-flex flex-column align-items-center">
                <i class="fa-solid fa-landmark-dome"></i>
                <h1 class="fw-semibold">+5000</h1>
                <h5 class="fw-light">Bâtiments Patrimoniaux</h5>
              </div>
            </div>
            <div class="card-container ms-auto">
              <div class="d-flex flex-column align-items-center">
                <i class="fa-brands fa-fort-awesome"></i>
                <h1 class="fw-semibold">+50</h1>
                <h5 class="fw-light">Forts</h5>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.poi-banner {
  height: 100%;
  min-height: 500px;
  color: var(--text-light-color);
  background: linear-gradient(225deg, var(--primary-color-dark) 70%, var(--primary-color-2) 10%, var(--primary-color-dark) 120%);
}

.phones-image {
  width: 30%;
  min-width: 300px;
  max-width: 420px;
  height: 100%;
  min-height: 500px;

  img {
    max-width: 210px;
    opacity: 0;
    /* cacher les images au départ */
    transition: opacity 0.5s ease-out;
    /* ajouter une transition de 0.5s pour l'opacité */
  }

  .fade-in {
    opacity: 0;
    /* mettre l'opacité à 0 pour toutes les images */
  }

  img:first-child {
    top: 40px;
    left: 30px;
  }

  img:last-child {
    bottom: 40px;
    right: 30px;
  }
}

.poi-cards {
  width: 40%;

  .fa-brands,
  .fa-solid {
    font-size: 3rem;
    margin-bottom: 8px;
    color: var(--accent-color);
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2px !important;
    color: var(--light-gray-background);
  }

  h2 {
    white-space: nowrap;
  }
}

@media (max-width: 940px) {
  .poi-cards {
    width: 90%;

    h2 {
      text-align: center !important;
      white-space: normal !important;
    }

    .card-container {
      width: 50%;
      margin: 0 auto !important;
      white-space: nowrap !important;
    }
  }
}

@media (max-width: 650px) {
  .poi-banner-content {
    flex-direction: column-reverse;
  }

  .poi-cards {
    width: 100%;

    .card-container {
      text-align: center;
      margin: 0 auto !important;
      white-space: normal !important;
    }
  }

  .phones-image {
    width: 100%;
  }
}
</style>
