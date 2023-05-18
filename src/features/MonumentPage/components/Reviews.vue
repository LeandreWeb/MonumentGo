<script setup lang="ts">
import type { ReviewInterface } from "@/shared/interfaces";
import { useUser, useMonuments } from "@/shared/stores";
import { Timestamp } from "@firebase/firestore";
import { ref, computed, reactive } from "vue";

const monumentStore = useMonuments();
const userStore = useUser();

const monument = computed(() => monumentStore.getMonumentById);
let visits = computed(() => monumentStore.getMonumentVisits.sort((a, b) => b.reviewDate - a.reviewDate));

const isCollapsed = reactive({ value: true });
const isReadMoreIndex = ref([] as number[]);
const isReview = ref(true);
let reviewTemp = ref("");
let reviewsCount = ref(3);

const newReview = reactive({
  idMonument: monument.value.id,
  idUser: "",
  review: "",
  reviewDate: null,
  username: "",
  mainPhoto: monument.value.mainPhoto,
  monumentName: monument.value.name,
});

function isEnoughReview(e) { e.target.value.trim().length > 0 ? isReview.value = true : isReview.value = false }

function readMore(index) { isReadMoreIndex.value = [...isReadMoreIndex.value, index] };

async function addReview(newReview: ReviewInterface) {
  newReview.idUser = userStore.getCurrentUser.id;
  newReview.username = userStore.getCurrentUser.username;
  newReview.reviewDate = Timestamp.now();

  await userStore.addAndUpdateReview(newReview);
};

async function updateReview(updatedReview: ReviewInterface) {
  await userStore.addAndUpdateReview(updatedReview);
};

async function deleteReview(idMonument: string) {
  for (let i = 0; i < visits.value.length; i++) {
    if (visits.value[i].idUser == userStore.getCurrentUser.id) {
      visits.value[i].review = "";
      visits.value[i].reviewDate = null;
    }
  };
  newReview.review = "";
  await userStore.deleteReview(idMonument);
};

function isEditable(review: ReviewInterface) {
  if (review.idUser == userStore.getCurrentUser.id && review.review) {
    return true;
  } else {
    return false;
  }
};

function cancelEdit(review: ReviewInterface) {
  review.isEditing = false;
  review.review = reviewTemp.value;
};
</script>

<template>
  <section class="py-1">
    <div class="container">

      <div class="col justify-content-center">

        <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse-review"
          @click="isCollapsed.value = !isCollapsed.value">
          <header class="card-header d-flex justify-content-between align-items-center">
            <h2>Évaluations</h2>
            <i class="icon-control fa"
              :class="{ 'fa-chevron-down': !isCollapsed.value, 'fa-chevron-up': isCollapsed.value }">
            </i>
          </header>
        </a>

        <div id="collapse-review" :class="{ 'collapse show': isCollapsed.value, 'collapse': !isCollapsed.value }">

          <div v-if="visits" class="mb-4">
            <div v-for=" (review, index) of visits.slice(0, reviewsCount)" :key="index" class="mt-3">
              <div v-if="review.reviewDate" class="flex-md-row card p-2 monument-reviews">

                <div class="d-flex align-items-center">
                  <div class="round me-3">
                    <span class="avatar">{{ review.username.charAt(0).toUpperCase() }}</span>
                  </div>
                </div>

                <div class="col d-flex align-items-center">
                  <div class="col mx-2">

                    <div class="d-flex flex-wrap justify-content-between">
                      <p class="mb-1 fw-bold">{{ review.username }}</p>
                      <i class="mb-1 ms-auto fw-semibold">{{ review.reviewDate.toDate().toLocaleDateString('fr-FR',
                        { day: 'numeric', month: 'long', year: 'numeric' }) }}
                      </i>
                    </div>

                    <div class="d-flex justify-content-between">
                      <template v-if="!review.isEditing">
                        <p v-if="review.review.length > 300 && !isReadMoreIndex.includes(index)" class="mb-0 text-break">
                          {{ review.review.slice(0, 300) }}
                          <button v-if="!isReadMoreIndex.includes(index)" @click="readMore(index)"
                            class="btn read-more-btn" data-bs-toggle="collapse" :data-bs-target="'#readmore-' + index">
                            ... Voir plus
                          </button>
                          <span :id="'readmore-' + index" class="collapse more-text">
                            {{ review.review.slice(300, review.review.length) }}
                          </span>
                        </p>

                        <p v-else class="mb-0 text-break">{{ review.review }}</p>

                        <div v-if="isEditable(review)" class="m-2 d-flex flex-column">
                          <button class="btn p-0 m-1 edit-btn"
                            @click="review.isEditing = true; reviewTemp = review.review">
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button class="btn p-0 m-1 profile-list-delete-btn" data-bs-toggle="collapse"
                            :data-bs-target="'#delete-review-' + index">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </template>

                      <template v-else>
                        <div class="d-flex flex-column">
                          <textarea rows="4" cols="100" class="form-control text-input mb-2" v-model="review.review"
                            :class="{ error: !isReview }" @input="isEnoughReview($event)" @keydown.escape="cancelEdit(review)">
                          </textarea>
                          <p v-if="!isReview">Votre évaluation est vide</p>
                        </div>

                        <div class="d-flex flex-column justify-content-end">
                          <button @click="cancelEdit(review)" class="btn btn-secondary m-2">Annuler</button>
                          <button @click="updateReview(review); review.isEditing = false" class="btn btn-warning m-2"
                            :disabled="!isReview">Modifier</button>
                        </div>
                      </template>
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

            <div class="text-center mb-3">
              <button v-if="visits.filter((visits) => visits.reviewDate != null).length > reviewsCount"
                @click="reviewsCount += 3" class="btn btn-more text-decoration-underline my-2">
                Afficher plus d'évaluations
              </button>
            </div>

            <div v-if="visits.some((e: any) => e.idUser === userStore.getCurrentUser.id && e.reviewDate == null)">
              <h5 class="my-2">Partager aux autres comment était votre visite, ajouter une évaluation !</h5>
              <div class="add-review">
                <div class="row d-flex">
                  <textarea class="mb-2 p-0 review-textarea" name="review" id="review" placeholder="Votre évaluation"
                    :class="{ error: !isReview }" v-model="newReview.review" @input="isEnoughReview($event)">
                          </textarea>
                </div>
                <p v-if="!isReview">Votre évaluation est vide</p>
              </div>
              <div class="d-flex justify-content-end">
                <button @click="addReview(newReview)" class="btn btn-success mt-2" :disabled="!isReview">
                  Ajouter l'évaluation
                </button>
              </div>
            </div>
            <div v-else-if="visits.some((e: any) => e.idUser === userStore.getCurrentUser.id)"></div>
            <div v-else class="col text-end">
              <h5 class="my-2">Visiter ce monument pour laisser une évaluation !</h5>
            </div>

          </div>

        </div>
        <hr>

      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.monument-reviews {
  border: 1px solid #ececec !important;
  border-radius: 15px;
  background-color: #ffffff8a;
}

.btn-more {
  border: none;

  &:hover {
    color: var(--primary-color);
    transform: scale(1.01);
  }
}

.read-more-btn {
  border: none;
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    color: var(--text-dark-color);
    transform: scale(1.01);
  }
}

.review-textarea {
  border: none;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: #ffffff00;
  height: 100px;
  width: 93%;
  margin: 0 20px;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.text-input {
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: transparent;
}

.round {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .round {
    width: 50px;
    height: 50px;
  }
}

.avatar {
  font-size: 2.1rem;
  font-weight: 600;
  color: var(--light-color) !important;
}

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
  border-radius: 15px;
  padding: 1.5rem 2rem;
}
</style>
