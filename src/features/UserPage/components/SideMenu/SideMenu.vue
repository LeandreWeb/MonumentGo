<script setup lang="ts">
import { reactive } from "vue";

const isCollapsed = reactive({ value: true });

</script>

<template>
  <aside class="col-lg-3 side-menu" id="infos">
    <button class="btn btn-outline-secondary mb-1 w-100 d-lg-none mt-2" data-bs-toggle="collapse"
      data-bs-target="#aside-menu">
      ☰ Menu
    </button>

    <div id="aside-menu" class="collapse card d-lg-block mb-5 mt-2">
      <div class="filter-group">

        <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-aside1"
          @click="isCollapsed.value = !isCollapsed.value">
          <header class="card-header"><i class="icon-control fa"
              :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
            </i> <b>Menu</b>
          </header>
        </a>

        <div id="collapse-aside1" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
          <div class="card-body">
            <RouterLink to="#tosee" class="btn btn-success my-2 menu-btn">Ma Liste À Voir</RouterLink>
            <RouterLink to="#liked" class="btn btn-success my-2 menu-btn">Mes Coups de Coeur</RouterLink>
            <RouterLink to="#visited" class="btn btn-success my-2 menu-btn">Monuments Visités</RouterLink>
            <RouterLink to="#circuit-made" class="btn btn-success my-2 menu-btn">Circuits Réalisés</RouterLink>
            <RouterLink to="#profile-reviews" class="btn btn-success my-2 menu-btn">Mes Évaluations</RouterLink>
          </div>
        </div>

      </div>
    </div>
    
  </aside>
</template>

<style lang="scss" scoped>
.side-menu {
  max-width: 300px;
}

.card {
  border: none;
  background-color: var(--light-gray-background);
  border-radius: 15px;

  .card-header {
    border-radius: 15px;
    font-size: 1.2rem;
  }
}

.menu-btn {
  width: 100%;
}

#aside-menu {
  position: sticky;
  top: 110px;
}
</style>
