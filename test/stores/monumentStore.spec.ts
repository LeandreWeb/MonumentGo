import { it, expect, describe,beforeEach,vi, vitest} from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useMonuments } from "../../src/shared/stores";

describe("test Monuments", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it.skip("monumentsFiltered retourne un array de monument", async () => {
        let test = useMonuments();
        const getMonuments = await test.monumentsFiltered;
        expect(getMonuments).toEqual([])
    })

    it("getMonumentsFilters retourne les filters par défaut d'un monument", async () => {
        let test = useMonuments();
        const getMonumentsFilters = await test.getMonumentsFilters;
        expect(getMonumentsFilters).toEqual({
            kmRange: 1,
            favorite: false,
            toSee: false,
            visited: false,
            notVisited: false,
          })
    })

    it("getMonumentById retourne un objet du monument", async () => {
        let test = useMonuments();
        const getMonumentById = await test.getMonumentById;

        expect(getMonumentById).toEqual({})
    })
})

// TESTS NON FONCTIONNELS

describe.skip("test load monument", () => {
    let monumentStore: any;
    beforeEach(() => {
      vi.mock("@/../../src/shared/stores/monumentStore.ts");
      setActivePinia(createPinia());
      monumentStore = useMonuments();
    });
    
    it("getMonumentById retourne un objet du monument", async () => {
        monumentStore.monuments = [
            {id: 1, name: "Un", city: "Drummundville"},
            {id: 2, name: "Deux", city: "Victoriaville"},
        ];
        monumentStore.city = "Drummundville";
        expect(monumentStore.setMonumentById(1).name).toEqual("Un");
    })
})



describe.skip("test load monument", () => {
    let monumentStore: any;
    beforeEach(() => {
        vi.mock("@/../../src/shared/stores/monumentStore.ts");
      setActivePinia(createPinia());
      //monumentStore = useMonuments();
    });
    it("getMonumentById retourne un objet du monument", async () => {
        monumentStore.monuments = [
            {id: 1, name: "Un", city: "Drummundville"},
            {id: 2, name: "Deux", city: "Victoriaville"},
        ];
        monumentStore.city = "Drummundville";
        expect(monumentStore.getMonumentById).toEqual("Blabla");
    })
})


describe.skip("test load monument", () => {
    it("load un monument", async () => {
        let test = useMonuments();
        const monument = await test.setMonumentById("1");
        //console.log(monument);
        expect(monument).toEqual({
            city: "Drummundville"
        })
    })
})

describe("Sprint 3 - MonumentStore pour page Near ", () => {
    let monumentStore: any;
    beforeEach(() => {
      vi.mock("@/../../src/shared/stores/monumentStore.ts");
      setActivePinia(createPinia());
      monumentStore = useMonuments();
    });

    it.skip("Calculer la distance entre 2 monuments", () => {
        /**
         * Prendre la localisation du monument de la page
         * Prendre la localisation du monument à comparer
         * Calculer la distance entre les 2 monuments
         * Valider la distance entre les 2 monuments
         */
    })

    it.skip("Ajouter monument à la liste", () => {
        /**
         * Prendre la localisation du monument de la page et du monument à comparer
         * Fixer une distance maximale pour être considérer À proximité
         * Calculer la distance entre les 2 monuments
         * Comparer la distance avec la distance maximale fixe
         * Valider le résultat (true / false)
         */
    })
})