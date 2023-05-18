import Register from "../../src/features/AuthenticationPage/components/Register.vue";
import { it, expect, describe, beforeEach, vi, vitest } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { router } from "../../src/router";


const mountOptions = {
  global: {
    mocks: {
      $router: {
        push: vi.fn(),
      },
    },
    plugins: [router],
  },
};

describe('Sprint 3 - Register.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(Register, mountOptions);
  });


  it.skip('should show the registration form', async () => {
    // Cliquer sur le lien d'inscription
    const registerLink = wrapper.find('.link-btn');
    await registerLink.trigger('click');

    // Vérifier que le formulaire d'inscription est présent
    const registerForm = wrapper.find('#register-form');
    expect(registerForm.exists()).toBe(true);
    expect(wrapper.vm.$route.path).toBe('/register');
  });

  it('should show the registration form and not refresh when submit', async () => {
    // Vérifie que le formulaire d'enregistrement est affiché initialement
    expect(wrapper.find('#register-form').exists()).toBe(true);

    // Déclenche l'événement de soumission de formulaire
    await wrapper.find('#register-form').trigger('#submit-register');

    // Vérifie que l'événement submit n'a pas provoqué de rechargement de page
    expect(wrapper.vm.$route.path).not.toBe('/register');
  });

  it('should disable the register button if fields are empty', async () => {
    // Vérifier que le bouton d'inscription est désactivé
    // lorsqu'un ou plusieurs champs sont vides
    const registerButton = wrapper.find('#submit-register');

    const registerState = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    };
    await wrapper.setData({ ...registerState });

    expect(registerButton.element.disabled).toBe(true);
  });

  it('should disable the register button if password is not secure enough', async () => {
    // Vérifier que le bouton d'inscription est désactivé
    // si le mot de passe est trop court ou ne contient pas de caractères spéciaux
    const registerButton = wrapper.find('#submit-register');

    const registerState = {
      firstname: 'John',
      lastname: 'Doe',
      username: 'john123',
      email: 'john@email.com',
      password: 'password',
    };
    await wrapper.setData({ ...registerState });

    expect(registerButton.element.disabled).toBe(true);
  });

  it('should disable the register button if email is invalid', async () => {
    // Vérifier que le bouton d'inscription est désactivé
    // si l'adresse e-mail n'est pas valide
    const registerButton = wrapper.find('#submit-register');

    const registerState = {
        firstname: 'John',
        lastname: 'Doe',
        username: 'john123',
        email: 'email',
        password: 'Pass123$',
      };
      await wrapper.setData({ ...registerState });

    expect(registerButton.element.disabled).toBe(true);
  });


});


describe('Register Methods', () => {

  it('should call submitRegisterForm when register form is submitted', async () => {
    const wrapper = mount(Register);
    const submitRegisterForm = vi.fn();
    wrapper.vm.submitRegisterForm = submitRegisterForm;

    await wrapper.find('#register-form').trigger('#submit-register');

    expect(submitRegisterForm).toHaveBeenCalled();
  });
});