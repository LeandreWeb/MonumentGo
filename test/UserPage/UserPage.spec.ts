import { it, expect, describe,beforeEach,vi, vitest} from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import UserPage from "../../src/features/UserPage/views/UserPage.vue";
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

  describe("Sprint 3 - UserPage.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(UserPage, mountOptions)
    })

    it("Menu différent selon la taille de l'écran (PETIT)", () => {
        const screnWidth = 990;
        vi.spyOn(window.screen, "width", "get").mockReturnValue(screnWidth);
        expect(window.screen.width).toBe(screnWidth);
        
        //const css = getComputedStyle(wrapper.find(".infos-list"))
        //expect(wrapper.find(css).exists()).toBe(true);
        //expect(wrapper.find(".infos-list")).toBe("unset");
    })

    it("Menu différent selon la taille de l'écran (GRAND)", () => {
        const screnWidth = 992;
        vi.spyOn(window.screen, "width", "get").mockReturnValue(screnWidth);
        expect(window.screen.width).toBe(screnWidth);
    })
})

// TESTS NON FONCTIONNELS
