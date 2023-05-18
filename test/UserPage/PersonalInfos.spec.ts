import { it, expect, describe, beforeEach, vi, vitest } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import PersonalInfos from "../../src/features/UserPage/components/UserInfos/PersonalInfos.vue";
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

describe("Sprint 3 - PersonalInfos.vue ", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(PersonalInfos, mountOptions)
  })

  it("Ligne demande le téléphone", () => {
    const pExists = wrapper.findAll("p").at(1);

    expect(pExists.exists()).toBe(true);

    expect(pExists.text()).toBe("Entrez un téléphone");
  })

  it("Sélection de l'âge", () => {
    const selectOp = wrapper.find("select");
    //const options = selectOp.findAll("option");

    selectOp.setValue("4");
    //expect(selectOp.contains('option')).toBe(true)
    expect(selectOp.element.value).toBe("4");

    selectOp.setValue("5");
    expect(selectOp.element.value).toBe("")
  })

  it("Icône pour modifier infos profil", () => {
    wrapper.find(".edit-btn").trigger("click");
    expect(wrapper.find("isCollapsed.value")).toBeTruthy();
  })

})

// TESTS NON FONCTIONNELS

describe("Sprint 3 - PersonalInfos.vue ", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(PersonalInfos, mountOptions)
  })


  it.skip("Bouton pour modifier infos profil", () => {
    wrapper.find("#btnEdit").trigger("click");
    //expect(wrapper.find("isCollapsed.value")).toBeFalsy();
  })

  it.skip("Modifier ses informations de profil", () => {
    /**
     * Chercher l'élément de l'icône
     * Chercher le bouton "Modifier"
     * Vérifier le clic
     * Valider que la modification a été faite
     */

    expect(wrapper.find("#firstname").exists()).toBe(true)
    //const test = wrapper.find("#firstname");
    //expect(test.find("input")).toBe(true);
    expect(wrapper.get("input").exists()).toBe(true)

    expect(wrapper.find("#lastname").exists()).toBe(true)
    expect(wrapper.get("input").exists()).toBe(true)

    expect(wrapper.find("#username").exists()).toBe(true)
    expect(wrapper.get("input").exists()).toBe(true)

    expect(wrapper.find("#phoneNumber").exists()).toBe(true)
    expect(wrapper.get("input").exists()).toBe(true)
    //expect(wrapper.find("input")).toBe(false);
  })
})