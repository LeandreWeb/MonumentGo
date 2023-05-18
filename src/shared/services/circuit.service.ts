import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import type { CircuitInterface } from "@/shared/interfaces";
import { MonumentService } from "./monument.service";

export class CircuitService {

  static async getCircuitsForMonument(idMonument: string) {
    const circuitsRef = collection(db, "circuits");
    const queryCircuits = query(circuitsRef, where("monuments", "array-contains", idMonument));
    const circuitsSnapshot = await getDocs(queryCircuits);

    const circuits = circuitsSnapshot.docs.map((circuitsLinked) => {
      return {
        id: circuitsLinked.id,
        idAdmin: circuitsLinked.data().idAdmin,
        name: circuitsLinked.data().name,
        description: circuitsLinked.data().description,
        mainPhoto: circuitsLinked.data().mainPhoto,
        monuments: circuitsLinked.data().monuments,
        creationDate: circuitsLinked.data().creationDate,
      };
    });

    return circuits;
  }

  static async getCircuitById(id: string): Promise<CircuitInterface | null> {
    const circuitRef = doc(db, "circuits", id);
    const circuitSnap = await getDoc(circuitRef);

    if (circuitSnap.exists()) {
      const monumentIds: string[] = circuitSnap.data()!.monuments;
      const monuments = await MonumentService.getMonumentsByIds(monumentIds);

      const fetchedCircuit: CircuitInterface = {
        id: circuitSnap.id,
        idAdmin: circuitSnap.data()!.idAdmin,
        name: circuitSnap.data()!.name,
        description: circuitSnap.data()!.description,
        mainPhoto: circuitSnap.data()!.mainPhoto,
        monuments: monuments,
        creationDate: circuitSnap.data()!.creationDate,
      };

      return fetchedCircuit;
    } else {
      return null;
    }
  }

  static async getCircuitsByIds(ids: string[]): Promise<CircuitInterface[] | null> {
    const promises = ids.map(async (id) => {
      const circuitRef = doc(db, "circuits", id);
      const circuitSnap = await getDoc(circuitRef);
      if (circuitSnap.exists()) {
        const monumentIds: string[] = circuitSnap.data()!.monuments;
        const monuments = await MonumentService.getMonumentsByIds(monumentIds);

        const fetchedCircuit: CircuitInterface = {
          id: circuitSnap.id,
          idAdmin: circuitSnap.data()!.idAdmin,
          name: circuitSnap.data()!.name,
          description: circuitSnap.data()!.description,
          mainPhoto: circuitSnap.data()!.mainPhoto,
          monuments: monuments,
          creationDate: circuitSnap.data()!.creationDate,
        };

        return fetchedCircuit;
      } else {
        return null;
      }
    });

    const circuits = await Promise.all(promises);
    if (circuits[0] !== null) {
      return circuits.filter(circuit => circuit !== null) as CircuitInterface[];
    } else {
      return null;
    }
  }
}

