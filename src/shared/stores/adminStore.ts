import { defineStore } from "pinia";
import { db } from "@/firebase";
import {
  query, orderBy, where, doc, setDoc, onSnapshot, addDoc,
  GeoPoint, collection, getDoc, startAt, endAt, getDocs, QuerySnapshot,
} from "firebase/firestore";
import { geohashForLocation, geohashQueryBounds, distanceBetween } from "geofire-common";
import type { MonumentInterface, MonumentFilterInterface } from "@/shared/interfaces";
import monumentsDataJSON from "@/shared/data/drummondMonumentsData.json";
import { useUser } from "@/shared/stores";
import { router } from "@/router";

interface AdminState {

}

export const useAdmin = defineStore("admin", {
  state: (): AdminState => ({

  }),

  getters: {

  },

  actions: {

  },
});
