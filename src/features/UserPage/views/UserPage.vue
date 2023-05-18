<script setup lang="ts">
import SideMenu from "../components/SideMenu/SideMenu.vue";
import NameBanner from "../components/UserInfos/NameBanner.vue";
import PersonalInfos from "../components/UserInfos/PersonalInfos.vue";
import ToSee from "../components/UserInfos/ToSee.vue";
import Liked from "../components/UserInfos/Liked.vue";
import Visited from "../components/UserInfos/Visited.vue";
import CircuitsMade from "../components/UserInfos/CircuitsMade.vue";
import ProfileReviews from "../components/UserInfos/ProfileReviews.vue";

</script>

<template>
  <NameBanner />
  <div class="row content border-top">
    <SideMenu class="side-menu" />
    <main class="col infos-list border-start px-4 pb-4">
      <PersonalInfos />
      <ToSee />
      <Liked />
      <Visited />
      <CircuitsMade />
      <ProfileReviews />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1200px) {
  .side-menu {
    max-width: 300px;
  }

  .infos-list {
    max-width: 1000px;
  }
}

@media (max-width: 1200px) {
  .side-menu {
    grid-area: menu;
  }

  .infos-list {
    grid-area: infos;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "menu infos";
  }

  .side-menu {
    width: 100% !important;
  }

  @media (max-width: 991px) {
    .content {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        "menu"
        "infos";
    }

    .side-menu {
      max-width: 100% !important;
    }

    .infos-list {
      border-left: unset !important;
    }
  }
}
</style>
