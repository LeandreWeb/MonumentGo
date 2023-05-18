<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const containerCard = ref<HTMLElement | null>(null);

const handleScroll = () => {
  if (containerCard.value !== null) {
    const containerCardsPosition = containerCard.value.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const percentVisible = Math.max(0, Math.min(1, (windowHeight - containerCardsPosition) / windowHeight * 1.8));
    const images = containerCard.value.querySelectorAll('.fade-in');
    images.forEach((image) => {
      (image as HTMLElement).style.opacity = percentVisible.toString();
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <div class="d-flex align-items-center justify-content-center py-5 qualities-banner">
    <div class="d-flex flex-column align-items-center w-100 qualities-banner-content" ref="containerCard">

      <h2 class="text-center fw-light mt-1 mb-4 fade-in">Pour les amoureux de la culture historique</h2>
      <div class="d-flex flex-wrap justify-content-evenly w-100 qualities-cards">

          <div class="card-container fade-in">
            <div class="d-flex flex-column align-items-center">
              <i class="fa-solid fa-user-graduate my-4"></i>
              <h3 class="fw-semibold mb-4">Éducatif</h3>
              <p>Il y a toujours plus à apprendre ! Laissez le
                patrimoine vous révéler son histoire.</p>
            </div>
          </div>
          <div class="card-container fade-in">
            <div class="d-flex flex-column align-items-center">
              <i class="fa-solid fa-leaf my-4"></i>
              <h3 class="fw-semibold mb-4">Simple</h3>
              <p>Tout simplement la meilleure application pour
                découvrir les monuments historique du Québec !</p>
            </div>
          </div>

          <div class="card-container fade-in">
            <div class="d-flex flex-column align-items-center">
              <i class="fa-solid fa-check-to-slot my-4"></i>
              <h3 class="fw-semibold mb-4">Pratique</h3>
              <p>Planifiez vos circuits à l'avance
                ou sur place et créez vos propres itinéraires.
              </p>
            </div>
          </div>
          <div class="card-container fade-in">
            <div class="d-flex flex-column align-items-center">
              <i class="fa-solid fa-child-reaching my-4"></i>
              <h3 class="fw-semibold mb-4">Conviviale</h3>
              <p>Ajouter en favoris vos monuments préférés et
                partager vos découvertes avec vos amis !
              </p>
            </div>
          </div>

      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.qualities-banner {
  min-height: 500px;
  color: var(--text-light-color);
  background: linear-gradient(225deg, var(--primary-color-dark) 40%, var(--dark-color) 10%, var(--primary-color-dark) 60%);
}

.card-container {
  max-width: 240px;
  padding: 0 10px;
  opacity: 1;
  transition: opacity 0.5s ease-out;

  .fade-in {
    opacity: 0;
  }
}

.qualities-cards {

  .fa-solid {
    font-size: 3.4rem;
    color: var(--accent-color);
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2px !important;
    color: var(--light-gray-background);
  }

  p {
    font-size: 1.1rem;
    text-align: center;
    color: var(--light-gray-background);
  }
}

</style>
