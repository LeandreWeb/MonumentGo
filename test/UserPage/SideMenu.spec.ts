import { it, expect, describe,beforeEach,vi, vitest} from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import SideMenu from "../../src/features/UserPage/components/SideMenu/SideMenu.vue";
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

  describe("Sprint 3 - SideMenu.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(SideMenu, mountOptions)
    })

    it("Affiche le bon texte sur le bouton", () => {
        const buttonText = "☰ Menu"
        const button = wrapper.find('button');

        expect(button.exists()).toBe(true);
        expect(button.text()).toBe(buttonText)
    })

    it("S'assure que la page contient la bonne structure", () => {
        expect(wrapper.exists(".card-header")).toBe(true);
        expect(wrapper.exists("button")).toBe(true);
        expect(wrapper.exists(".card-body")).toBe(true);
    })
})

// TESTS NON FONCTIONNELS

describe("Sprint 3 - SideMenu.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(SideMenu, mountOptions)
    })

    it.skip("Vérifier que le menu est en gras", () => {
        const button = wrapper.find("b");

        expect(button.exists()).toBe(true);
        expect(button.html()).toBe("<b>Menu</b>")
    })
})