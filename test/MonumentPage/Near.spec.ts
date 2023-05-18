import { it, expect, describe,beforeEach,vi, vitest} from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import Near from "../../src/features/MonumentPage/components/Near.vue";
import {router} from "../../src/router";

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

describe("Sprint 3 - Near.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(Near, mountOptions)
    })

    it("Contient le bon titre", () => {
        expect(wrapper.find(".title").text()).toBe("À Proximité");
    })

    it("Affiche message d'aucun monument à proximité", () => {
        const p = wrapper.find('p');
        expect(p.exists()).toBe(true);
        expect(p.text()).toBe("Il n'y a aucun monument à proximité.")
    })
})

// TESTS NON FONCTIONNELS

describe("Sprint 3 - Near.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(Near, mountOptions)
    })

    it.skip("Afficher les monuments à proximité", () => {
        /**Déclarer les variables de test
         * Rechercher la liste des monuments à proximité
         * Valider l'affichage de ceux-ci
         */
    })
})