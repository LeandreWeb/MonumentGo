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
      <article class="filter-group">
        <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-aside1"
          @click="isCollapsed.value = !isCollapsed.value">
          <header class="card-header"><i class="icon-control fa"
              :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
            </i> <b>Menu</b>
          </header>
        </a>
        <div id="collapse-aside1" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
          <div class="card-body">
            <RouterLink to="#monuments-list" class="btn btn-success my-2 menu-btn">Liste des Monuments</RouterLink>
            <RouterLink to="#add-monument" class="btn btn-success my-2 menu-btn">Ajouter un Monument</RouterLink>
            <RouterLink to="#circuits-list" class="btn btn-success my-2 menu-btn">Liste des Circuits</RouterLink>
            <RouterLink to="#add-circuit" class="btn btn-success my-2 menu-btn">Ajouter un Circuit</RouterLink>
          </div>
        </div>
      </article>
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
  top: 82px;
}
</style>
