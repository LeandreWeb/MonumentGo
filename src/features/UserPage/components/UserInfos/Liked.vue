<script setup lang="ts">
import { useUser } from "@/shared/stores";
import { reactive } from "vue";

const userStore = useUser();

const isCollapsed = reactive({ value: true });
const monumentLikedIndex = reactive({ index: null as number | null });

async function deleteMonument(index: number, id: string) {
  if (monumentLikedIndex.index === index) {
    await userStore.toggleMonumentLike(id);
    monumentLikedIndex.index = null;
  } else {
    monumentLikedIndex.index = index;
  }
}

function closeAllCollapseShow() {
  monumentLikedIndex.index = null;
  const monuments = userStore.getCurrentUser.favorites;
  for (let i = 0; i < monuments!.length; i++) {
    const collapse = document.getElementById(`delete-liked-${i}`);
    if (collapse && collapse.classList.contains("show")) {
      collapse.classList.remove("show");
    }
  }
}

</script>

<template>
  <main class="col" id="liked">

    <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-liked"
      @click="isCollapsed.value = !isCollapsed.value">
      <header class="card-header d-flex justify-content-between align-items-center">
        <h2>Mes Coups de Coeur</h2>
        <i class="icon-control fa" :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
        </i>
      </header>
    </a>

    <div id="collapse-liked" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">
      <div class="d-flex flex-wrap">
        <div v-for="(monumentLiked, index) of userStore.getCurrentUser.favorites" :key="monumentLiked.id"
          class="m-1">

          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center position-relative">

              <RouterLink :to="`/monuments/${monumentLiked.id}`" class="profile-list-img">
                <img :src="monumentLiked.mainPhoto" alt="" class="monument-small-img">
              </RouterLink>

              <button class="btn p-0 profile-list-delete-btn mt-3 me-3 profile-list-hide position-absolute top-0 end-0"
                data-bs-toggle="collapse" :data-bs-target="'#delete-liked-' + index"
                @click="closeAllCollapseShow(), monumentLikedIndex.index = index">
                <i class="fa-solid fa-trash"></i>
              </button>

              <div :id="`delete-liked-${index}`" class="collapse position-absolute bottom-0 end-0 start-0 mb-1">
                <div class="text-center">
                  <button @click="deleteMonument(index, monumentLiked.id!)" class="btn btn-danger"
                    data-bs-toggle="collapse" :data-bs-target="'#delete-liked-' + index">Confirmer</button>
                </div>
              </div>

              <div class="position-absolute bottom-0 end-0 start-0 mb-1 me-2">
                <p class="img-monument-name mb-0"
                  :style="{ display: monumentLikedIndex.index === index ? 'none' : 'block' }">
                  {{ monumentLiked.name }}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

  </main>
  <hr class="mt-4">
</template>

<style lang="scss" scoped>
.profile-list-delete-btn {
  border: none;
  width: 26px;
  height: 26px;
  font-size: 1.2rem;
}

.profile-list-delete-btn:hover {
  color: var(--danger-color);
}

.profile-list-hide {
  display: none;
}

.profile-list-img:hover+.profile-list-hide,
.profile-list-delete-btn:hover {
  display: block;
}

.monument-small-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  box-shadow: 0 0 3px #00000046;

  &:hover {
    opacity: 0.85;
    transition: 0.3s;
  }
}

.img-monument-name {
  max-width: fit-content;
  max-height: 45px;
  font-size: 0.8rem;
  color: var(--text-light-color);
  background-color: #00000083;
  padding: 0.2rem 0.2rem;
  overflow: hidden;

  &:hover {
    max-height: unset;
    overflow: visible;
  }
}
</style>
