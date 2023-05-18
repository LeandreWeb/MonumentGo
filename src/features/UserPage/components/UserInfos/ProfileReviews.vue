<script setup lang="ts">
import type { ReviewInterface } from "@/shared/interfaces";
import { useUser } from "@/shared/stores";
import { computed, reactive, ref } from "vue";

const userStore = useUser();

const isCollapsed = reactive({ value: true });
const isReadMoreIndex = ref([] as number[])
const isReview = ref(true)
let reviewsCount = ref(3)

function isEnoughReview(e) { e.target.value.trim().length > 0 ? isReview.value = true : isReview.value = false }

function readMore(index) { isReadMoreIndex.value = [...isReadMoreIndex.value, index] };

const reviews = computed(() => userStore.getCurrentUser.reviews);

async function deleteReview(idMonument: string) {
  await userStore.deleteReview(idMonument);
};

async function updateReview(updatedReview: ReviewInterface) {
  await userStore.addAndUpdateReview(updatedReview);
};

</script>

<template>
  <main class="col" id="profile-reviews">

    <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-profile-reviews"
      @click="isCollapsed.value = !isCollapsed.value">
      <header class="card-header d-flex justify-content-between align-items-center">
        <h2>Mes Évaluations</h2>
        <i class="icon-control fa" :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
        </i>
      </header>
    </a>

    <div id="collapse-profile-reviews" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">

      <div v-if="reviews" class="mb-4">
        <div v-for="(review, index) of reviews.slice(0, reviewsCount)" :key="index" class="mt-4">
          <div class="flex-md-row card p-2">

            <div class="d-flex align-items-center">
              <img :src="review.mainPhoto" class="rounded-circle profile-review-img m-auto" alt="">
            </div>

            <div class="col d-flex align-items-center">
              <div class="col mx-2">

                <div class="d-flex flex-wrap justify-content-between">
                  <p class="mb-1 fw-bold">{{ review.monumentName }}</p>
                  <i v-if="review.reviewDate" class="mb-1 ms-auto fw-semibold">{{ review.reviewDate.toDate().toLocaleDateString('fr-FR',
                    { day: 'numeric', month: 'long', year: 'numeric' }) }}
                  </i>
                </div>

                <p v-if="review.review.length > 300 && !isReadMoreIndex.includes(index)" class="mb-0 text-break">
                  {{ review.review.slice(0, 300) }}
                  <button v-if="!isReadMoreIndex.includes(index)" @click="readMore(index)" class="btn read-more-btn"
                    data-bs-toggle="collapse" :data-bs-target="'#readmore-' + index">
                    ... Voir plus
                  </button>
                  <span :id="'readmore-' + index" class="collapse more-text">
                    {{ review.review.slice(300, review.review.length) }}
                  </span>
                </p>
                <p v-else class="mb-0 text-break">{{ review.review }}</p>

              </div>
            </div>

            <div class="m-2 d-flex align-items-center justify-content-end">
              <button class="btn p-0 edit-btn" data-bs-toggle="collapse" :data-bs-target="'#edit-review-' + index">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn p-0 profile-list-delete-btn ms-3" data-bs-toggle="collapse"
                :data-bs-target="'#delete-review-' + index">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>

          </div>

          <div :id="`edit-review-${index}`" class="collapse">
            <div class="edit-review p-4 m-3">
              <h5>Modifier l'évaluation ici</h5>

              <div class="form-group">
                <div class="row">
                  <textarea rows="4" cols="50" class="form-control text-input mb-2" name="review" id="review"
                    v-model="review.review" :class="{ error: !isReview }" @input="isEnoughReview($event)">
                  </textarea>
                  <p v-if="!isReview">Votre évaluation est vide</p>
                </div>

                <div class="d-flex justify-content-end">
                  <button @click="updateReview(review)" class="btn btn-warning mt-2" data-bs-toggle="collapse"
                    :data-bs-target="'#edit-review-' + index" :disabled="!isReview">Modifier</button>
                </div>
              </div>

            </div>
          </div>

          <div :id="`delete-review-${index}`" class="collapse mt-2">
            <div class="d-flex justify-content-end align-items-baseline">
              <h5 class="me-3">Voulez-vous vraiment supprimer cette évaluation ?</h5>
              <button @click="deleteReview(review.idMonument)" class="btn btn-danger" data-bs-toggle="collapse"
                :data-bs-target="'#delete-review-' + index">Supprimer</button>
            </div>
          </div>

        </div>
      </div>

      <div v-if="reviews" class="text-center mb-3">
        <button v-if="reviews.length > reviewsCount" @click="reviewsCount = reviewsCount + 3"
          class="btn btn-more text-decoration-underline my-2">Afficher plus d'évaluations</button>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
.profile-list-delete-btn,
.edit-btn {
  border: none;
  font-size: 1.2rem;
}

.fa-trash:hover {
  color: var(--danger-color);
}

.fa-pen-to-square:hover {
  color: var(--primary-color);
}

.edit-review {
  background-color: var(--light-gray-background);
  border-radius: 15px;
  padding: 1.5rem 2rem;
}

.profile-review-img {
  width: 70px;
  height: 70px;
}

.btn-more {
  border: none;

  &:hover {
    color: var(--primary-color);
    transform: scale(1.01);
  }
}

.text-input {
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: transparent;
  margin-bottom: 5px;
}

.card {
  border: 1px solid var(--light-color);
  background-color: var(--text-light-color);
}

.error {
  border-color: red !important;
}
</style>
