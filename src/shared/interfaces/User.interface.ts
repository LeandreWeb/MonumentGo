import type { Timestamp } from 'firebase/firestore';
import type { CircuitInterface, PartialMonumentInterface } from '@/shared/interfaces';

enum connectionState {
  anonymous,
  connected,
  admin,
}

export interface UserInterface {
  connectionState: connectionState,
  id: string;
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  age?: number;
  phoneNumber?: string;
  toSee?: PartialMonumentInterface[];
  favorites?: PartialMonumentInterface[];
  visitedMonument?: PartialMonumentInterface[];
  finishedCircuits?: CircuitInterface[];
  reviews?: ReviewInterface[];
  isVisited?: boolean,
}

export interface ReviewInterface {
  idMonument: string,
  idUser: string,
  username: string,
  review: string,
  reviewDate: Timestamp | null,
  monumentName: string,
  mainPhoto: string,
  isEditing?: boolean,
}

export type UserFormInterface = Partial<UserInterface>;

export interface SigninFormInterface {
  email: string;
  password: string;
}