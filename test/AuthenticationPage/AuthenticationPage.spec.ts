import { it, expect, describe, beforeEach, vi, vitest } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useMonuments } from "../../src/shared/stores";
import AuthenticationPage from "../../src/features/AuthenticationPage/views/AuthenticationPage.vue";
import Login from "../../src/features/AuthenticationPage/components/Login.vue";
import Register from "../../src/features/AuthenticationPage/components/Register.vue";
// import { router } from "../../src/router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/",
      redirect: { name: "login" }
    },

  ]
});

const mountOptions = {
  global: {
    plugins: [router],
  },
};

describe('Sprint 3 - AuthenticationPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    router.push("/login");
    wrapper = mount(AuthenticationPage, mountOptions);
  });

  it("should show the login section when the route is /login", () => {
    expect(wrapper.find("#login-component").exists()).toBe(true);
  });

  it("should show the register section when the route is /register", async () => {
    await router.push("/register");
    expect(wrapper.find("#register-component").exists()).toBe(true);
  });

  it('should simulate the login link', async () => {
    const loginLinks = wrapper.findAll('#to-login');

    // Vérifier qu'au moins un lien a été trouvé
    expect(loginLinks.length).toBeGreaterThan(0);

    // Déclencher un clic sur le premier lien trouvé
    await loginLinks[0].trigger('click');

    // Vérifier que l'URL a été mise à jour
    expect(wrapper.vm.$route.path).toBe('/login');
  });

  it('should simulate the register link', async () => {
    await router.push("/register");
    const registerLinks = wrapper.findAll('#to-register');

    // Vérifier qu'au moins un lien a été trouvé
    expect(registerLinks.length).toBeGreaterThan(0);

    // Déclencher un clic sur le premier lien trouvé
    await registerLinks[0].trigger('click');

    // Vérifier que l'URL a été mise à jour
    expect(wrapper.vm.$route.path).toBe('/register');
  });
});