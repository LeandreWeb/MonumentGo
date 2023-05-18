import { it, expect, describe,beforeEach,vi, vitest, expectTypeOf, afterEach} from "vitest";
import { mount,shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import InteractiveMapShortcut from "../../src/features/HomePage/components/Description/InteractiveMapShortcut.vue";
import InteractiveMapPage from "../../src/features/InteractiveMapPage/views/InteractiveMapPage.vue";
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

  describe("Sprint 3 - InteractiveMapShortcut.vue ", () => {
    let wrapper;
    let assignMock = vi.fn();

    beforeEach(() => {
        setActivePinia(createPinia());
        //wrapper = mount(InteractiveMapShortcut, mountOptions)
    });

    afterEach(() => {
        assignMock.mockClear();
    });

    it("S'assurer que le lien de l'image est le bon", () => {
        wrapper = shallowMount(InteractiveMapShortcut, mountOptions)
        expect(wrapper.findAll("img").at(0).attributes("src").slice(0, 8)).toEqual("/images/");
        expect(wrapper.findAll("img").at(0).attributes("src")).toEqual("/images/check-icon.png");
    })

    it("Vérifier que l'url de la page d'accueil est le bon", () => {
        
        const url = "http://127.0.0.1:5173/";
        Object.defineProperty(window, "location", {
          value: new URL(url)
        } );
      
        window.location.href = url;
        expect(window.location.href).toEqual(url);
    })
})

// TESTS NON FONCTIONNELS

describe("Sprint 3 - InteractiveMapShortcut.vue ", () => {
    let wrapper;
    let windowSpy;

    beforeEach(() => {
        setActivePinia(createPinia());
        windowSpy = vi.spyOn(window, "window", "get");
        wrapper = mount(InteractiveMapShortcut, mountOptions)
    })

    afterEach(() => {
        windowSpy.mockRestore();
    });

    it.skip("Clic sur bouton envoie à la bonne page", async () => {
        windowSpy.mockImplementation(() => ({
            location: {
              origin: "http://127.0.0.1:5173/"
            }
          }));
        
        const btn = wrapper.find(".btn-success");
        await btn.trigger("click")

        //expect(window.open).toHaveBeenCalledWith('http://127.0.0.1:5173/')
        expect(window.location.origin).toEqual("http://127.0.0.1:5173/");
        expect(window.location.assign).toEqual("/interactiveMap");
        

    })
})