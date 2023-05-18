<script setup lang="ts">
import Banner from "../components/Banner.vue";
import InteractiveMapShortcut from "../components/Description/InteractiveMapShortcut.vue";
import POIBanner from "../components/Description/POIBanner.vue";
import QualitiesBanner from "../components/Description/QualitiesBanner.vue";
import ReviewsCarousel from "../components/Description/ReviewsCarousel.vue";
import SuggestionsBanner from "../components/Description/SuggestionsBanner.vue";
import ContactForm from "../components/ContactForm.vue";

</script>

<template>
  <div class="row content">
    <Banner />
    <InteractiveMapShortcut />
    <POIBanner />
    <ReviewsCarousel />
    <QualitiesBanner />
    <SuggestionsBanner />
    <ContactForm />
  </div>
</template>

<style lang="scss" scoped>

.content {
  font-family: 'Raleway', sans-serif;
  background-color: var(--light-color);
}


</style>
