<script setup lang="ts">

</script>

<template>
  <div class="interactive-map-shortcut d-flex justify-content-center border-top">

    <div class="content">

      <div class="d-flex justify-content-center features">
        <div class="d-flex justify-content-evenly align-items-start w-100">
          <div class="d-flex flex-column justify-content-center align-items-center feature-card">
            <img src="/images/check-icon.png" class="icon">
            <div class="feature-text">
              <h5 class="mb-3 fw-semibold">À vous de choisir</h5>
              <p>Musées, forts, bâtiments patrimoniaux, statuts, MonumentGo référence les meilleurs endroits à 
                <span class="text-nowrap">visiter !</span>
              </p>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center feature-card">
            <img src="/images/star-icon.png" class="icon">
            <div class="feature-text">
              <h5 class="mb-3 fw-semibold">Planifiez votre escapade</h5>
              <p class="mx-auto">Ajouter en favoris les visites que vous souhaitez faire et ne soyez plus jamais 
                <span class="text-nowrap">déçu !</span>
              </p>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center feature-card">
            <img src="/images/dollar-icon.png" class="icon">
            <div class="feature-text">
              <h5 class="mb-3 fw-semibold">Entièrement gratuite</h5>
              <p>MonumentGo est une application gratuite et dédiée au plus grand <span class="text-nowrap">nombre !</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column align-items-center map-preview px-2">
        <div class="w-100">
          <h2 class="mb-4 fw-semibold">Une carte interactive facile à utiliser</h2>

          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column map-preview-text me-5">
              <p class="mb-3"> Découvrez ou redécouvrez le patrimoine des plus belles villes proches de chez
                vous ou à l'autre bout du Québec.
              </p>
              <p class="mb-3">Créez-vous un compte afin d'accéder à du contenu exclusif lorsque vous faites
                la visite d'un monument !
              </p>
              <RouterLink to="/interactiveMap" class="btn btn-success map-preview-btn mt-3">Accéder à la carte
                intéractive
            </RouterLink>
          </div>

            <!-- <div class="m-1">
                  <img src="/images/map-preview.png" alt="image-carte-interactive">
                </div> -->

            <video class="m-1" autoplay muted loop>
              <source src="/images/map-preview-video.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.interactive-map-shortcut {
  background-color: var(--text-light-color);
  z-index: 10;
}

.content {
  width: 100%;
  max-width: 1150px;
}

.map-preview {
  margin: 80px 0 !important;

  img,
  video {
    width: 100%;
    max-width: 500px;
    border-radius: 15px;
    box-shadow: 0px 10px 20px -15px #000000;
  }

  .map-preview-text {
    width: 100%;
    max-width: 430px;
    font-size: 1.1rem;
  }

  .map-preview-btn {
    width: 200px;
    font-weight: 500;
    // background-color: var(--primary-color-dark);
    background-color: var(--primary-color);
  }
}

.features {
  margin: 80px 0;

  .icon {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
  }

  .feature-card {
    margin: 0 25px;
    text-align: center;

    p {
      max-width: 200px;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 820px) {
  .map-preview {
    margin: 40px 0 !important;

    img,
    video {
      max-width: 350px;
    }

    .map-preview-text {
      max-width: 300px;
    }

    .map-preview-btn {
      width: 150px;
    }
  }

  .features {
    margin: 50px 0;

    .feature-card {
      margin: 0 15px;

      p {
        max-width: 180px;
      }
    }
  }
}

@media (max-width: 650px) {
  .map-preview {

    :first-child div {
      flex-direction: column;
      align-items: center;
    }

    img,
    video {
      margin: 25px auto 10px !important;
      width: 400px;
      max-width: 100%;
    }

    .map-preview-text {
      max-width: 100%;
      margin-right: unset !important;
    }

    .map-preview-btn {
      width: 150px;
    }
  }

  .features {
    margin: 50px 0;

    :first-child {
      align-items: center !important;
      flex-direction: column;
    }

    .icon {
      width: 50px;
      height: 50px;
    }

    .feature-card {
      flex-direction: row !important;
      max-width: 100%;
      margin-bottom: 1rem;

      .feature-text {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        width: 400px;
        max-width: 100%;
      }

      p {
        max-width: 100%;
      }

      h5 {
        margin-bottom: 10px !important;
      }
    }
  }
}
</style>
