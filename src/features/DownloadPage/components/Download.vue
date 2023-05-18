<script setup lang="ts">

</script>

<template>
  <main class="d-flex justify-content-center banner">

    <div class="d-flex flex-wrap justify-content-evenly max-width">
      <div class="d-flex flex-column justify-content-center download-shortcuts mb-4">

        <div class="mb-3">
          <h1>Laissez notre carte interactive vous <span class="fw-bold">guider</span> à travers les joyaux cachés de
            votre <span class="text-nowrap fw-bold">région !</span></h1>

          <div class="mb-4">
            <h4 class="mb-4">Vous n'avez qu'à <span class="fw-bold">télécharger</span> l'application
              <span class="text-nowrap fw-bold">ici !</span>
            </h4>
            <p>Une application essentielle pour tous les amateurs d'histoire et de patrimoine.</p>
          </div>
        </div>

        <div class="d-flex flex-column align-items-center download-btns">
          <div class="d-flex align-items-center">
            <hr class="horizontal-line m-0">
            <h5 class="mb-0 mx-3">TÉLÉCHARGER</h5>
            <hr class="horizontal-line m-0">
          </div>

          <div class="d-flex justify-content-evenly w-100 mt-3 flex-wrap flex-md-row download-btn">
            <a href="https://www.apple.com/ca/fr/app-store/" target="_blank">
              <button class="btn btn-download-appstore"></button>
            </a>
            <a href="https://play.google.com/store/apps?hl=fr_CA&gl=US" target="_blank">
              <button class="btn btn-download-playstore"></button>
            </a>
          </div>
        </div>

      </div>

    </div>

  </main>
</template>

<style lang="scss" scoped>
.banner {
  min-height: calc(100vh - 290px);
  padding-top: 3rem;
}

.max-width {
  width: 100%;
  max-width: 1350px;
}

.horizontal-line {
  width: 120px;
  height: 2px;
  background-color: var(--text-dark-color);
}

.download-shortcuts {
  min-width: 620px;
  padding: 0 5rem;

  h1 {
    color: var(--primary-color-2);
    color: var(--primary-color);
    font-size: 3rem;
    font-weight: 600;

    span {
      color: var(--primary-color-2);
    }
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
  }
}

.download-btns {
  max-width: 600px;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.btn-download-appstore {
  background-image: url("/images/Download_on_the_App_Store_Badge_FRCA_RGB_blk_100517.svg");
}

.btn-download-playstore {
  background-image: url("/images/google-play-badge.png");
}

.btn-download-appstore,
.btn-download-playstore {
  width: 200px;
  height: 60px;
  background-size: cover;
  background-position: center;
  border: none;

  &:hover {
    opacity: .85;
  }
}


@media (max-width: 640px) {

  .download-shortcuts {
    min-width: 0;
    padding: 0 1rem;
  }

  .download-btns {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .btn-download-appstore,
  .btn-download-playstore {
    width: 160px;
    height: 53px;
    margin: 0.8rem;
  }

  .horizontal-line {
    width: 80px;
  }
}

@media (max-width: 450px) {
  .banner h1 {
    font-size: 2rem !important;
  }
}

@media (max-width: 380px) {
  .banner h1 {
    font-size: 1.5rem !important;
  }

  .horizontal-line {
    width: 60px;
  }
}
</style>
