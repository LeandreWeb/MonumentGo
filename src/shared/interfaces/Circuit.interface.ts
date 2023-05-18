import type { Timestamp } from 'firebase/firestore';
import type { MonumentInterface } from ".";

export interface CircuitInterface {
  id: string;
  idAdmin: string;
  name: string;
  description: string;
  mainPhoto: string;
  monuments: MonumentInterface[];
  creationDate?: Timestamp;
}

