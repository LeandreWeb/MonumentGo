<script setup lang="ts">

</script>

<template>
  <div class="suggestion-banner d-flex justify-content-center px-4 py-4">

    <div class="suggestion-banner-content d-flex flex-column justify-content-between">
      <div class="d-flex flex-column me-auto my-3 p-3 w-75 paragraphe">
        <h2 class="fw-semibold">Préparer votre expédition</h2>
        <p class="mb-0">Votre profil sera votre carnet de route. Choisissez les sites incontournables pour
          devenir votre propre guide et ne rien manquer. MonumentGo vous offre une planification plus
          efficace et vous permet de commencer à explorer avant même le début de votre voyage.
          Profitez pleinement de votre aventure et partagez vos découvertes préférées avec vos amis</p>
      </div>

      <div class="d-flex flex-column ms-auto my-3 p-3 w-75 paragraphe">
        <h2 class="fw-semibold text-end">Ou laissez vous guider</h2>
        <p class="mb-0">Activer la fonction de découverte instantanée pour un voyage sans soucis. Vous n'avez
          plus à vous inquiéter, MonumentGo vous avertira automatiquement lorsque vous êtes proche d'un site important.
          Si vous utiliser l'application à ce moment là vous pourrez débloquer l'accès à du contenu exclusif sur
          les monuments près de vous ! Si vous n'avez pas prévu à l'avance, MonumentGo sera votre
          compagnon de voyage indispensable.</p>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.suggestion-banner {
  min-height: 500px;
  background-image: url("/images/histo-chateau-frontenac.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  border-top: 1px solid var(--accent-color);
  border-bottom: 1px solid var(--accent-color);
}

.suggestion-banner-content {
  max-width: 1300px;
}

.paragraphe {
  font-size: 1.2rem;
  line-height: 1.5rem;
  border-radius: 25px;
  background: radial-gradient(ellipse at center, rgba(240, 240, 240, 0.95) 0%, rgba(240, 240, 240, 0.85) 50%, rgba(240, 240, 240, 0.6) 105%);
  box-shadow: 0 0 5px 1px rgba(240, 240, 240);
  font-weight: 500;
  padding: 15px !important;

  p {
    text-align: justify;
  }
}

@media (max-width: 480px) {
  .paragraphe {
    font-size: 1rem;
    line-height: 1.2rem;
  }
}

@media (max-width: 480px) {
  .paragraphe {
    width: 100% !important;
  }
}
</style>
