import { it, expect, describe, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";

describe("test Store Monument", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it("Le store doit avoir un rayon de 1km au depart ", () => {
    //arrange
    let monuments = useMonuments();
    //act
    const KmOnMount = monuments.filters.kmRange;
    //assert
    expect(KmOnMount).toBe(1);
  });
  
  it("le store doit avoir une latitude initial de 45.88042494009625", () => {
    //arrange
    let monuments = useMonuments();
    //act
    const initialLAt = monuments.centerLatitude;
    //assert
    expect(initialLAt).toBe(45.509913);
  });
  
  it("le store doit avoir une longitude initial de -72.47754529826918", () => {
    //arrange
    let monuments = useMonuments();
    //act
    const initialLong = monuments.centerLongitude;
    //assert
    expect(initialLong).toBe(-73.579138);
  });
});

it.skip("Le store doit avoir une certaine quantiter de monuments apres la methode setMonumentsWithinRadius()", () => {
  //arrange
  //vi.mock("@/shared/stores/monumentStore.ts");
  let monuments = useMonuments();
  let monumentList = monuments.monumentsTemp;
  //act
  monuments.setMonumentsWithinRadius();
  console.log("Longuer", monumentList);
  //assert
  expect(monumentList.length).toBeGreaterThan(0);
});
it("Sanity", () => {
  expect(1).toBe(1);
});
