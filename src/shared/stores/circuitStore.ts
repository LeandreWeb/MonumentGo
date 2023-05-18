import { CircuitService } from '@/shared/services';
import { defineStore } from "pinia";
import { Timestamp } from "firebase/firestore";
import type { CircuitInterface } from "@/shared/interfaces";

interface CircuitState {
  circuitById: CircuitInterface;
};

export const useCircuits = defineStore("circuit", {
  state: (): CircuitState => ({
    circuitById: {
      id: "",
      idAdmin: "",
      name: "",
      description: "",
      mainPhoto: "",
      monuments: [],
      creationDate: Timestamp.now(),
    },
  }),

  getters: {
    getCircuitById() {
      return this.circuitById;
    },
  },

  actions: {

    async setCircuitById(idCircuit: string) {
      const fetchedCircuit = await CircuitService.getCircuitById(idCircuit);

      if (fetchedCircuit) {
        this.circuitById = fetchedCircuit;
      }
    }
  },
});
