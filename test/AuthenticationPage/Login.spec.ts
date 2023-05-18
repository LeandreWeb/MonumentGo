import { it, expect, describe, beforeEach, vi, vitest } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import Login from "../../src/features/AuthenticationPage/components/Login.vue";
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

describe('Sprint 3 - Login.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(Login, mountOptions);
  });

  it('should show the login form', async () => {
    // Vérifier que le formulaire de connexion est présent
    const loginForm = wrapper.find('#login-form');

    expect(loginForm.exists()).toBe(true);
    expect(wrapper.vm.$route.path).toBe('/login');
  });

  
});

describe('Login Methods', () => {
  it('should call submitLoginForm when login form is submitted', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [createPinia()],
      },
    });
    const submitLoginForm = vi.fn();
    wrapper.vm.$pinia.$options.actions.submitLoginForm = submitLoginForm;

    await wrapper.find('#login-form').trigger('#submit-login');

    expect(submitLoginForm).toHaveBeenCalled();
  });
});