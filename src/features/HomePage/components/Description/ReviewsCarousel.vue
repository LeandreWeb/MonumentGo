<script setup lang="ts">
import reviewsData from '@/shared/data/reviews.json';

const reviews = reviewsData;

</script>

<template>
  <div class="reviews-carousel py-5">
    <div class="d-flex justify-content-center">
      <div id="reviews-carousel-indicators" class="carousel carousel-dark slide py-5 px-2" data-bs-ride="carousel">
        <ol class="carousel-indicators mt-5">
          <li v-for="(review, index) in reviews.length / 2" :key="index" data-bs-target="#reviews-carousel-indicators"
            :data-bs-slide-to="index" :class="{ active: index === 0 }"></li>
        </ol>
        <div class="carousel-inner text-center mx-auto">
          <div v-for="index in Math.ceil(reviews.length / 2)" :key="index" class="carousel-item"
            :class="{ active: index === 1 }" data-bs-interval="6000">
            <div class="row">
              <div class="col-md-6">
                <div class="review">
                  <p class="mb-4"><span class="big">”</span>{{ reviews[(index - 1) * 2].body }}</p>
                  <hr class="horizontal-line mx-auto">
                  <h5 class="text-center mb-1">{{ reviews[(index - 1) * 2].author }}</h5>
                </div>
              </div>
              <div class="col-md-6" v-if="reviews.length > (index - 1) * 2 + 1">
                <div class="review">
                  <p class="mb-4"><span class="big">”</span>{{ reviews[(index - 1) * 2 + 1].body }}</p>
                  <hr class="horizontal-line mx-auto">
                  <h5 class="text-center mb-1">{{ reviews[(index - 1) * 2 + 1].author }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#reviews-carousel-indicators" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#reviews-carousel-indicators" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reviews-carousel {
  height: fit-content;
  background-color: var(--text-light-color);
}

#reviews-carousel-indicators {
  height: 340px;
}

.carousel-inner {
  height: fit-content;
  max-width: 80%;
  overflow: hidden;
}

.horizontal-line {
  width: 120px;
  height: 2px;
  background-color: var(--text-dark-color);
}

.big {
  // font-size: 2rem;
  font-weight: 700;
}

@media (max-width: 800px) {
  .reviews-carousel {
    padding: 20px !important;
  }

  #reviews-carousel-indicators {
    height: 450px;
    padding: 20px !important;
  }

  .carousel-inner {
    max-width: 70%;

    h5 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
      margin-top: 20px;
    }

    .horizontal-line {
      width: 80px;
      margin: 10px auto !important;
    }
  }
}

@media (max-width: 600px) {
  .carousel-indicators {
    display: none;
  }

  #reviews-carousel-indicators {
    padding: 10px !important;
    height: fit-content !important;
  }

}
</style>
