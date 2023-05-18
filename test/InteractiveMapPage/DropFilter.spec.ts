import { it, expect, describe, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";
import { createTestingPinia } from "@pinia/testing";
import DropFilter from "../../src/features/InteractiveMapPage/components/DropFilter.vue";

it("Must show Filter Menu", () => {
  //arrange
  const wrapper = mount(DropFilter, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  });

  let monuments = useMonuments();
  let monumentList = monuments.monumentsTemp;

  const value= "Rayon de recherche: 1.00 km";

  const label=wrapper.get("#km-range-label")

  //console.log(label.element);

  expect(label.element.textContent).toBe(value)
});
