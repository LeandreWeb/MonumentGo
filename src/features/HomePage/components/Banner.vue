<script setup lang="ts">

</script>

<template>
  <div class="d-flex justify-content-center banner">

    <div class="d-flex flex-wrap justify-content-evenly max-width">
      <div class="d-flex flex-column justify-content-center download-shortcuts mb-4">

        <div class="mb-3">
          <h1><span class="fw-bold">Télécharger</span> l'app et</h1>
          <h1 class="mb-4">commencer à <span class="text-nowrap fw-bold">marcher !</span></h1>

          <div class="mb-4">
            <h4>Votre visite commence ici !</h4>
            <p>Faites la découverte de monuments historiques de
              façon simple et ludique grâce à MonumentGo !</p>
          </div>
        </div>


        <div class="d-flex flex-column align-items-center download-btns-fullsize">
          <div class="d-flex align-items-center">
            <hr class="horizontal-line m-0">
            <h5 class="mb-0 mx-3">TÉLÉCHARGER</h5>
            <hr class="horizontal-line m-0">
          </div>

          <div class="d-flex justify-content-evenly w-100 mt-3 flex-wrap flex-md-row">
            <a href="https://www.apple.com/ca/fr/app-store/" target="_blank">
              <button class="btn btn-download-appstore"></button>
            </a>
            <a href="https://play.google.com/store/apps?hl=fr_CA&gl=US" target="_blank">
              <button class="btn btn-download-playstore"></button>
            </a>
          </div>
        </div>

      </div>

      <div class="d-flex phone-preview mt-auto">

        <div class="d-flex text-center my-auto w-50 p-2 download-btns-cropped d-none">
          <h5 class="mb-2">TÉLÉCHARGER</h5>
          <a href="https://www.apple.com/ca/fr/app-store/" target="_blank">
            <button class="btn btn-download-appstore m-1"></button>
          </a>
          <a href="https://play.google.com/store/apps?hl=fr_CA&gl=US" target="_blank">
            <button class="btn btn-download-playstore m-1"></button>
          </a>
        </div>

        <img src="/images/phone-preview.png" alt="" class="fullsize">
        <img src="/images/phone-preview-crop.png" alt="" class="cropped d-none mt-3">

      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.banner {
  background-color: var(--white-color);
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
  width: 60%;
  min-width: 620px;
  max-width: 750px;
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

@media (max-width: 1020px) {
  .horizontal-line {
    width: 80px;
  }

  .download-shortcuts {
    width: 410px;
    min-width: 400px;
    padding: 0 1rem;

    h1 {
      font-size: 2.1rem;
    }

    h4 {
      font-size: 1.2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .btn-download-appstore,
  .btn-download-playstore {
    width: 160px;
    height: 45px;
  }

  .phone-preview img {
    width: 245px;
    height: auto;
  }
}

@media (max-width: 720px) {
  .banner {
    height: auto;
    padding-top: 2rem;
  }

  .download-shortcuts {
    min-width: 0;
    margin-bottom: unset !important;

    hr {
      display: none;
    }
  }

  .btn-download-appstore,
  .btn-download-playstore {
    width: 150px;
    height: 42px;
  }

  .fullsize,
  .download-btns-fullsize {
    display: none !important;
  }

  .cropped,
  .download-btns-cropped {
    display: block !important;
  }
}

@media (max-width: 470px) {
  .phone-preview img {
    width: 200px;
    height: auto;
  }
}

@media (max-width: 420px) {
  .phone-preview {
    flex-direction: column;
  }

  .phone-preview img {
    width: 80%;
    margin: auto;
  }

  .download-btns-cropped {
    width: 100% !important;
  }
}

@media (max-width: 380px) {
  .banner h1 {
    font-size: 1.5rem !important;
  }
}

@keyframes phone-preview-animation {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

.phone-preview img {
  animation: phone-preview-animation 0.9s;
  animation-timing-function: linear;
}
</style>
