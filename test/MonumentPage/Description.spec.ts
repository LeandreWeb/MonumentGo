import { it, expect, describe,beforeEach,vi, vitest} from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import Description from "../../src/features/MonumentPage/components/Description.vue";

describe("Description.vue ", () => {
    let wrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        wrapper = mount(Description)
    })
    it("Contient le bon titre", () => {
        expect(wrapper.find("h2").text()).toBe("Description");
    })

    it("bouton isCollapsed", () => {
        //resume
        wrapper.find(".title").trigger("click")
        expect(wrapper.find("isCollapsed.value")).toBeTruthy();

        //description
        wrapper.find("#collapse-description").trigger("click")
        expect(wrapper.find("isCollapsed.value")).toBeTruthy();
    })
})



// TESTS NON FONCTIONNELS

describe.skip("test Description Monument", () => {
    beforeEach(() => {
        vi.mock("@/../../src/shared/stores/monumentStore.ts");
        setActivePinia(createPinia());
      });

    it ("Renvoie le bon monument",async ()=>{

    let monuments=useMonuments()
    let monument = await monuments.setMonumentById("1");
    //console.log(monument)

    expect(monument).toBe("1");
    })
})