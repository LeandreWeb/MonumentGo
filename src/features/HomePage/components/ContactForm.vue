<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, reactive } from 'vue';
import { useUser } from "@/shared/stores";

const userStore = useUser();

const containerForm = ref<HTMLElement | null>(null);

const handleScroll = () => {
  if (containerForm.value !== null) {
    const containerFormsPosition = containerForm.value.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const percentVisible = Math.max(0, Math.min(1, (windowHeight - containerFormsPosition) / windowHeight * 1.9));
    const images = containerForm.value.querySelectorAll('.fade-in');
    images.forEach((image) => {
      (image as HTMLElement).style.opacity = percentVisible.toString();
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

interface ContactFormInterface {
  name: string;
  email: string;
  organisation?: string;
  message: string;
}

const contactFormState = reactive<ContactFormInterface>({
  name: "",
  email: "",
  organisation: "",
  message: "",
});

const isDisabled = computed(() => {
  return !contactFormState.name || !contactFormState.email || !contactFormState.message;
});

const isEnoughName = computed(() => {
  return contactFormState.name.length >= 3 || contactFormState.name.length === 0;
});

const isEnoughMessage = computed(() => {
  return contactFormState.message.length > 0 || contactFormState.message.length === 0; // À Vérifier*
});

const isEmail = computed(() => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactFormState.email) || contactFormState.email.length === 0;
});

</script>

<template>
  <div id="contact" class="d-flex align-items-center justify-content-center py-5 contact-form">
    <div class="d-flex flex-column align-items-center w-100" ref="containerForm">

      <h2 class="text-center fw-medium mt-1 mb-4 fade-in">Des questions ?
        <span class="text-nowrap">Vous pouvez nous écrire ici !</span>
      </h2>
      <div class="d-flex flex-wrap justify-content-evenly form fade-in">

        <div class="row d-flex contact-form-content">

          <div class="d-flex flex-column col-5 col-md-4 inputs">
            <input type="text" v-model="contactFormState.name" :class="{ error: !isEnoughName }"
              class="form-control text-input mb-4" id="name" placeholder="Votre Nom">
            <p v-if="!isEnoughName" class="mb-0"><i>&nbsp; 3 caractères minimum !</i></p>

            <input type="text" v-model="contactFormState.organisation" class="form-control text-input mb-4"
              id="organisation" placeholder="Organisation">

            <input type="email" v-model="contactFormState.email" :class="{ error: !isEmail }"
              class="form-control text-input mb-4" id="registerEmail" placeholder="Adresse Courriel">
            <p v-if="!isEmail" class="mb-0"><i>&nbsp; Votre adresse e-mail est invalide</i></p>

            <button class="btn btn-success btn-block mt-auto mb-2" :disabled="isDisabled || !isEnoughName || !isEmail">
              Envoyer
            </button>
          </div>

          <div class="d-flex flex-column col-7 col-md-8 message">
            <textarea rows="4" cols="50" class="form-control text-input mb-2" name="message" id="message"
              placeholder="Votre message" v-model="contactFormState.message"
              :class="{ error: !isEnoughMessage }"></textarea>
            <p v-if="!isEnoughMessage" class="mb-0"><i>Votre message est vide !</i></p>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-form {
  width: 100%;
  min-height: 580px;
  background-color: var(--text-light-color);
  opacity: 1;
  transition: opacity 0.5s ease-out;

  .fade-in {
    opacity: 0;
  }
}

.form {
  width: 100%;
  max-width: 1100px;
  min-height: 350px;
  margin: 0 auto;
  padding: 20px;

  .contact-form-content {
    width: 100%;

    #message {
      height: 100% !important;
      resize: none;
    }
  }
}

.text-input {
  border: none;
  border-radius: 0;
  border-bottom: 3px solid #d3d3d3 !important;
  background-color: transparent;
  margin-bottom: 5px;
}

@media (max-width: 610px) {
  .form {
    .contact-form-content {
      flex-direction: column-reverse;
      align-items: center;

      .inputs {
        width: 100%;
      }

      .message {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
}

@media (max-width: 480px) {
  .form {
    padding-left: unset;
    padding-right: unset;
  }
}

.error {
  border-color: var(--danger-color) !important;
}
</style>
