<script setup lang="ts">
import { useRoute } from "vue-router";
import { useUser } from "@/shared/stores";

const route = useRoute();
const userStore = useUser();

</script>

<template>
  <header class="header row section-header align-items-center border-bottom border-2 sticky-top"
    :class="{ 'map-header': route.path == '/interactiveMap', 'admin-header': route.path == '/admin' }">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">

        <RouterLink to="/" class="navbar-logo ms-4">
          <img class="monumentGo-logo pb-1" height="70" src="/icones/monumentGo-logo-carte-charcoal.png" />
        </RouterLink>

        <div class="d-flex">
          <li class="nav-item nav-profile-button-cropped d-none">
            <RouterLink to="/profile" class="btn mx-1 border-0 p-0 nav-link">
              <span class="d-block p-1 mx-2 profile"> <i class="fa fa-user"></i></span>
            </RouterLink>
          </li>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div id="navbarSupportedContent" class="collapse navbar-collapse justify-content-end">
          <div class="row gy-3 align-items-center">

            <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">

              <li class="nav-item nav-button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <RouterLink to="/interactiveMap" class="btn mx-1 border-0 p-0 nav-link">
                  <span class="d-block p-1 mx-1"> <i class="fa-regular fa-map"></i> Carte Interactive </span>
                </RouterLink>
              </li>
              <li class="nav-splitter"></li>

              <li class="nav-item nav-button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <RouterLink to="/download" class="btn mx-1 border-0 p-0 nav-link">
                  <span class="d-block p-1 mx-1"> Téléchargement </span>
                </RouterLink>
              </li>
              <li class="nav-splitter"></li>

              <li class="nav-item nav-button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <RouterLink to="/#contact" class="btn mx-1 border-0 p-0 nav-link">
                  <span class="d-block p-1 mx-1 contact-btn"> Contact </span>
                </RouterLink>
              </li>
              <li class="nav-splitter"></li>

              <li class="nav-item nav-button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <RouterLink to="/register" class="btn mx-1 border-0 p-0 nav-link">
                  <span class="d-block p-1 mx-1"> Inscription </span>
                </RouterLink>
              </li>

              <li class="nav-item nav-profile-button" title="Veuillez vous connecter">
                <RouterLink to="/profile" class="btn mx-1 border-0 p-0 nav-link">
                  <span class="d-block p-1 mx-2 profile"> <i class="fa fa-user"></i></span>
                </RouterLink>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.monumentGo-logo {
  transform: rotateZ(0deg);
}

.monumentGo-logo:hover {
  animation: hithere 1s ease-in-out;
}

.profile {
  font-size: 1.5rem;
  background-color: var(--text-dark-color);
  color: var(--light-color) !important;
  border-radius: 50%;
  padding: 5px;
  width: 45px;
}

.nav-profile-button :hover,
.nav-profile-button-cropped :hover {
  color: var(--accent-color) !important;
}

.header {
  height: 90px;
  background-color: var(--header-background);
}

.nav-button a,
.nav-button span {
  color: var(--text-dark-color);
}

.nav-button :hover {
  color: var(--accent-color);
  transform: scale(1.02);
}

.nav-button {
  max-height: 40px;
}

.nav-splitter {
  border-left: 2px solid var(--accent-color) !important;
  height: 35px;
  margin: 0 15px;
}

.map-header {
  height: 70px !important;

  .monumentGo-logo {
    height: 50px;
  }

  .navbar-nav {
    margin-top: 8px !important;
  }
}

.admin-header {
  height: 70px !important;

  .monumentGo-logo {
    height: 50px;
  }

  .navbar-nav {
    margin-top: 8px !important;
  }
}

a.router-link-active span:not(.contact-btn),
a.router-link-active span i {
  color: var(--accent-color);
}

@media (max-width: 991px) {
  .header {
    height: 70px !important;
  }

  .nav-splitter {
    display: none;
  }

  .monumentGo-logo {
    height: 50px;
  }

  .navbar-nav {
    margin-top: 6px !important;
  }

  .nav-button {
    width: 60%;
    min-width: 420px;
    border-bottom: 50px solid var(--accent-color);

    a {
      background-color: var(--light-color);
      margin: 0 !important;
      padding: 3px !important;
      border-radius: 0;
    }

    span {
      margin: 0 !important;
      padding: 3px !important;
      border-radius: 0;
      margin: 5px 0 !important;
    }
  }

  .nav-profile-button-cropped {
    display: block !important;
  }

  .nav-profile-button {
    display: none !important;
  }
}

@media (max-width: 595px) {
  .nav-button {
    width: 90%;
    min-width: unset;
  }

  .navbar-nav {
    margin-top: 14px !important;
  }

  .navbar-logo {
    margin-left: 0 !important;
  }
}

@keyframes hithere {
  0% {
    transform: rotateZ(0deg);
  }

  60% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(5deg);
  }

  70% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
