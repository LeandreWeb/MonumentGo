<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

function goToTop() {
  window.scrollTo(0, 0);
}

</script>

<template>
  <footer v-if="route.path != '/interactiveMap' && route.path != '/admin' && route.path != '/' && route.path != '/login' && route.path != '/register'"
    class="footer align-items-center border-top row">
    <section class="footer-main container-fluid">
      <div class="row d-flex justify-content-center">
        <div class="text-center">
          <img class="monumentGo-logo mb-2" height="60" src="/icones/monumentGo-logo-carte-charcoal.png" />
        </div>
        <div class="m-0 text-center">
          <RouterLink to="/" class="btn mx-2 p-1">
            <span>Accueil</span>
          </RouterLink>
          <RouterLink to="/interactiveMap" class="btn mx-2 p-1">
            <span class="divider">|</span><span class="mx-4">Carte Interactive</span><span class="divider">|</span>
          </RouterLink>
          <RouterLink to="/#contact" class="btn mx-2 p-1">
            <span>Contact</span>
          </RouterLink>
        </div>
        <small class="text-center mt-3 copyright">&nbsp;&nbsp; © {{ new Date().getFullYear() }} MonumentGo Tout droits
          réservés.</small>
      </div>
    </section>
  </footer>

  <footer v-if="route.path == '/'" class="footer-home align-items-center border-top row">
    <section class="d-flex justify-content-center">

      <div class="d-flex flex-wrap justify-content-evenly w-100 max-width">

        <div class="d-flex flex-column m-3 logo">
          <div>
            <img class="monumentGo-logo mb-2" height="70" src="/icones/monumentGo-logo-carte-charcoal.png" />
          </div>
          <p>Site réalisé par la team 13 de développement web du cégep de Shawinigan</p>
          <small class="mt-3 copyright"> © {{ new Date().getFullYear() }}
            MonumentGo Tout droits réservés.
          </small>
        </div>

        <div class="d-flex flex-column m-3 download">
          <h5 class="fw-bold mb-4">Télécharger</h5>
          <div class="d-flex flex-column">
            <a href="https://www.apple.com/ca/fr/app-store/" target="_blank">
              <button class="btn btn-download-appstore mb-4"></button>
            </a>
            <a href="https://play.google.com/store/apps?hl=fr_CA&gl=US" target="_blank">
              <button class="btn btn-download-playstore"></button>
            </a>
          </div>
        </div>

        <div class="d-flex flex-column m-3 address">
          <h5 class="fw-bold mb-4">Adresse</h5>
          <h6>450 Rue du Parc</h6>
          <h6>Trois-Rivières</h6>
          <h6>Québec</h6>
          <h6>G0X 2X0</h6>
          <h6>(450) 555-6739</h6>
        </div>

        <div class="d-flex flex-column m-3 navigation">
          <h5 class="fw-bold mb-4">Naviguer</h5>
          <RouterLink to="/interactiveMap">
            <h6>Carte Interactive</h6>
          </RouterLink>
          <RouterLink to="/download">
            <h6> Téléchargement </h6>
          </RouterLink>
          <RouterLink to="/#contact">
            <h6>Contact</h6>
          </RouterLink>
          <RouterLink to="/register">
            <h6>Inscription</h6>
          </RouterLink>
          <RouterLink to="/login">
            <h6>Profile</h6>
          </RouterLink>
        </div>

      </div>

    </section>

    <button @click="goToTop()" class="btn go-to-top-btn position-absolute">
      <i class="fa-solid fa-arrow-up"></i>
    </button>

  </footer>
</template>

<style lang="scss" scoped>
.copyright {
  font-size: 0.8rem;
  color: var(--accent-color);
}

.max-width {
  max-width: 1200px;
}

.footer,
.footer-home {
  height: 200px;
  background: linear-gradient(to top, transparent, var(--light-gray-gradient));
  bottom: 0;
  position: absolute;
  width: 100%;
}

.footer-home {
  height: fit-content;
  min-height: 320px;
  padding: 25px 15px;
}

.btn-download-appstore {
  background-image: url("/images/Download_on_the_App_Store_Badge_FRCA_RGB_blk_100517.svg");
}

.btn-download-playstore {
  background-image: url("/images/google-play-badge.png");
}

.btn-download-appstore,
.btn-download-playstore {
  width: 160px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border: none;

  &:hover {
    opacity: .85;
  }
}

.logo {
  max-width: 270px;
}

.navigation a:hover {
  color: var(--accent-color);
}

.go-to-top-btn {
  background-color: #444;
  color: var(--text-light-color);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.5rem;
  top: -23px;
  right: 45px;
}

@media (max-width: 870px) {

  .btn-download-appstore,
  .btn-download-playstore {
    width: 110px;
    height: 35px;
  }
}

@media (max-width: 820px) {
  .footer-home {
    height: 465px;
  }

  .logo {
    width: 100%;
    max-width: unset;

    .copyright {
      margin-top: 0 !important;
    }
  }
}

@media (max-width: 520px) {

  .navigation {
    display: none !important;
  }
}

@media (max-width: 450px) {
  .footer {
    height: 160px;
    .footer-main {
      .text-center {
        span {
          margin: 0 !important;
        }

        .divider {
          display: none;
        }
      }
    }
  }
}
</style>
