<script setup lang="ts">
import HeaderVue from "./components/Header.vue";
import FooterVue from "./components/Footer.vue";
import { useMonuments, useUser } from "@/shared/stores";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const monumentStore = useMonuments();
const userStore = useUser();

onMounted(() => {
  userStore.initUserState();
  // monumentStore.seedMonuments(); // Ne pas décommenter sauf pour seeder ***
});

</script>

<template>
  <div id="page-container" class="container-fluid">
    <div id="content-wrap" :class="{
      'content-wrap': route.path != '/interactiveMap' && route.path != '/admin'
        && route.path != '/login' && route.path != '/register', 'content-wrap-home': route.path == '/'
    }">
      <HeaderVue />
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Component :is="Component" />
        </template>
      </RouterView>
    </div>
    <FooterVue />
  </div>
</template>

<style scoped>
#page-container {
  min-height: 100vh;
  position: relative;
}

.content-wrap {
  padding-bottom: 200px;
}

@media (max-width: 450px) {
  .content-wrap {
    padding-bottom: 160px;
  }
}

.content-wrap-home {
  padding-bottom: 320px;
}

@media (max-width: 820px) {
  .content-wrap-home {
    padding-bottom: 465px;
  }
}

@media print {
  header {
    display: none;
  }

  footer {
    display: none;
  }
}
</style>
