<script setup lang="ts">
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
  <div class="row content">
    <div class="d-flex flex-column align-items-center justify-content-center p-0 authentication">

      <transition name="fade-transition" class="transition-form">
        <section v-if="route.path == '/login'" class="d-flex flex-column align-items-lg-center p-3 w-50">

          <router-link id="to-register" to="/register" class="btn btn-success link-btn">
            Aller à l'inscription
          </router-link>

          <div class="container d-flex justify-content-center">
            <div class="row">
              <Login/>
            </div>
          </div>

        </section>
      </transition>

      <transition name="fade-transition" class="transition-form">
        <section v-if="route.path == '/register'" class="d-flex flex-column align-items-lg-center p-3 w-50">

          <router-link id="to-login" to="/login" class="btn btn-success link-btn">
            Aller à la connexion
          </router-link>

          <div class="container d-flex justify-content-center">
            <div class="row">
              <Register/>
            </div>
          </div>

        </section>
      </transition>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-height: calc(100vh - 90px);
  font-family: 'Raleway', sans-serif;
  background: linear-gradient(150deg, var(--white-color) 70%, var(--primary-color-2) 10%, var(--primary-color-dark) 80%) !important;
}

@media (max-width: 991px) {
  .content {
    min-height: calc(100vh - 70px);
  }
}

.authentication {
  position: relative;

  section {
    position: absolute;
    top: 50;
    left: 50;
    min-width: 500px;
    width: 35vw;
  }

  .link-btn {
    border-radius: 50px;
    width: 280px;
    background: linear-gradient(150deg, var(--primary-color-2) 50%, var(--primary-color-dark) 80%) !important;
    margin: 1rem auto !important;

    &:hover {
      background: linear-gradient(150deg, var(--primary-color-dark) 50%, var(--primary-color-2) 80%) !important;
    }
  }
}


.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 0.5s;
}

.fade-transition-enter,
.fade-transition-leave-to {
  opacity: 0;
}

@media screen and (max-width: 500px) {
  .authentication {
    section {
      padding: 1rem !important;
      min-width: 90vw !important;
      width: 100%;
    }

    .link-btn {
      width: 90% !important;
    }
  }
}
</style>
