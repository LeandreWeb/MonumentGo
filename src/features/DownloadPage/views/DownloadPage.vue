<script setup lang="ts">
import Download from "../components/Download.vue";

</script>

<template>
  <div class="row content">
    <Download />
  </div>
</template>

<style lang="scss" scoped>
.content {
  font-family: 'Raleway', sans-serif;
  min-height: calc(100vh - 290px);
  background: linear-gradient(150deg, var(--white-color) 70%, var(--primary-color-2) 10%, var(--primary-color-dark) 100%);
}

</style>
