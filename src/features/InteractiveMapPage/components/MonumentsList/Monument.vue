<script setup lang="ts">
import type { MonumentInterface } from "@/shared/interfaces/index";
import { useUser } from "@/shared/stores";

const userStore = useUser();

const props = defineProps<{ monument: MonumentInterface, index: number }>();

function controlPlusOneLike() {
  if (userStore.getCurrentUser.favorites!.some((e) => e.id === props.monument.id)) {
    props.monument.likes = props.monument.likes - 1;
  } else {
    props.monument.likes = props.monument.likes + 1;
  }
}

function inToSeeList() {
  const user = userStore.getCurrentUser;
  if ((user.connectionState == 1 && user.toSee!.some((e) => e.id === props.monument.id))
    || (user.connectionState == 0 && user.toSee!.some((e) => e as any === props.monument.id))) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <main class="d-flex border-bottom limit-height mb-0 position-relative">

    <RouterLink :to="`/monuments/${monument.id}`" class="monument-link">
      <img :src="monument.mainPhoto" class="monument-img" />
      <!-- <img :src="`${monument.mainPhoto}&streamid=vignette`" class="monument-img" /> -->
      <p class="position-absolute top-0 end-0 monument-name m-2 me-auto px-2 text-end">{{ monument.name }}</p>
    </RouterLink>

    <button v-if="userStore.getCurrentUser.connectionState != 0"
      class="btn like-btn likes position-absolute bottom-0 start-0 m-1"
      @click="userStore.toggleMonumentLike(monument.id), controlPlusOneLike()">
      <i class="fa-solid fa-heart"
        :class="userStore.getCurrentUser.favorites!.some((e) => e.id === monument.id) ? 'liked' : ''"></i>
      {{ monument.likes }}
    </button>
    <div v-else class="likes position-absolute bottom-0 start-0 m-1">
      {{ monument.likes }} J'aime
    </div>

    <div class="monument-infos d-flex flex-column">

      <div class="m-2 monument-address mt-auto pb-1 text-end">
        <p class="mb-1">{{ monument.civicNumber }} {{ monument.street }}</p>
        <!-- <p class="mb-0">{{ monument.city }}</p> -->
        <i class="fw-semibold text-nowrap">Distance: {{ monument.distanceBetween?.toFixed(2) }} km</i>
      </div>

      <div class="d-flex justify-content-between mx-2 mb-2">

        <strong class="monument-year text-nowrap me-2">Année: {{ monument.year }}</strong>

        <button class="btn small-tosee-btn" @click="userStore.toggleMonumentToSee(monument.id)">
          <span v-if="inToSeeList()" class="d-flex align-items-center justify-content-between">
            <strong class="me-2">Retirer</strong>
            <i class="fa-solid fa-minus-circle fs-4"></i>
          </span>
          <span v-else class="d-flex align-items-center justify-content-between">
            <strong class="me-2 text-nowrap">À Voir</strong>
            <i class="fa-solid fa-plus-circle fs-4"></i>
          </span>
        </button>

      </div>

    </div>

  </main>
</template>

<style lang="scss" scoped>
.limit-height {
  height: 160px;
}

.monument-img {
  height: 160px;
  width: 100%;
  min-width: 150px;
  max-width: 160px;
  object-fit: cover;
}

.monument-name {
  background-color: var(--transparent-light-background);
  font-family: 'Raleway', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  height: fit-content;
  width: fit-content;
}

.monument-link:hover {
  color: var(--primary-color);
}

.monument-infos {
  background-color: var(--text-light-color);
  width: 100%;
}

.like-btn {
  border: none;
  padding: 0.3rem 0.55rem 0.05rem 0.5rem;
  font-size: 0.8rem;
  color: var(--light-gray-background);
  background-color: var(--transparent-dark-background);
  border-radius: 50px;

  &:hover {
    background-color: var(--transparent-light-hover);
  }
}

.likes {
  font-size: 0.8rem;
  color: var(--light-gray-background);
  background-color: var(--transparent-dark-background);
  border-radius: 50px;
  padding: 0.2rem 0.4rem 0.04rem 0.4rem;
}

.small-tosee-btn {
  width: fit-content;
  font-size: 1rem;
  background-color: transparent !important;
  border: none;
  padding: 0;

  &:hover span {
    color: var(--primary-color) !important;
  }
}

.liked {
  color: var(--liked-color);
}
</style>
