import { it, expect, describe,beforeEach,vi, vitest} from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import History from "../../src/features/MonumentPage/components/History.vue";

describe("History.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(History)
    })
    it("Contient le bon titre", () => {
        expect(wrapper.find("h2").text()).toBe("Histoire");
    })
})

// TESTS NON FONCTIONNELS

