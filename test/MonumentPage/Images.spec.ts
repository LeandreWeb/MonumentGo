import { it, expect, describe,beforeEach,vi, vitest} from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import Images from "../../src/features/MonumentPage/components/Images.vue";
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

// TESTS NON FONCTIONNELS
describe("Images.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(Images)
    })

    it.skip("Contient le bon titre", () => {
        expect(wrapper.find(".monument-year").text()).toBe("Année: ");
    })

    it.skip("Le bouton like incrémente le nombre de likes", () => {
        wrapper.find(".like-btn").trigger("click");
    })
})

describe("Sprint 3 - Images.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(Images, mountOptions)
    })

    it.skip("Message quand Monument est dans favoris", () => {
      expect(wrapper.findAll("v-if").at(4).text()).toBe("Retirer de votre liste À Voir");
    })

    it.skip("Message quand Monument pas dans favoris", () => {
      expect(wrapper.findAll("v-else").at(2).text()).toBe("Ajouter à votre liste À Voir");
    })

    it.skip("Afficher les images", () => {
        /**
         * Déclarer les variables de test
         * Aller chercher l'url de l'image
         * Valider l'affichage de l'image sur la page
         */
    })
})
