import { SeedService } from './../services/seed.service';
import { defineStore } from "pinia";
import type { Geopoint } from "geofire-common";
import type { MonumentInterface, MonumentFilterInterface, MonumentVisitInterface, CircuitInterface } from "@/shared/interfaces";
import montrealMonumentsDataJSON from "@/shared/data/montrealMonumentsData.json";
import drummondMonumentsDataJSON from "@/shared/data/drummondMonumentsData.json";
import { useUser } from "@/shared/stores";
import { router } from "@/router";
import { MonumentService, CircuitService } from "@/shared/services";


interface MonumentState {
  monumentsTemp: MonumentInterface[];
  monumentsFiltered: MonumentInterface[];
  filters: MonumentFilterInterface;
  sortBy: string;
  monumentById: MonumentInterface;
  monumentsLimited: MonumentInterface[];
  error: any;
  limit: number;
  centerLatitude: number;
  centerLongitude: number;
  nearMonuments: [];
  visits: MonumentVisitInterface[];
  circuits: CircuitInterface[];
  distanceBetween: number;
};

export const useMonuments = defineStore("monument", {
  state: (): MonumentState => ({
    monumentsTemp: [],
    monumentsFiltered: [],
    filters: {
      kmRange: 1,
      favorite: false,
      toSee: false,
      visited: false,
      notVisited: false,
    },
    sortBy: "distance",
    monumentById: {} as MonumentInterface,
    monumentsLimited: [],
    error: null,
    visits: [] as MonumentVisitInterface[],
    circuits: [] as CircuitInterface[],
    nearMonuments: [],
    distanceBetween: 0,
    centerLatitude: 45.509913,
    centerLongitude: -73.579138,
    limit: 10,
  }),

  getters: {
    getMonumentsFilters() {
      return this.filters;
    },
    getMonumentById() {
      return this.monumentById;
    },
    getMonumentsLimited() {
      return this.monumentsLimited
    },
    getMonumentsFiltered() {
      return this.monumentsFiltered;
    },
    getNearMonuments() {
      return this.nearMonuments;
    },
    getMonumentVisits() {
      return this.visits;
    },
    getMonumentCircuits() {
      return this.circuits;
    },
  },

  actions: {

    async setMonumentsWithinRadius() {
      this.monumentsTemp = await MonumentService.getMonumentsWithinRadius(this.centerLatitude, this.centerLongitude, this.filters.kmRange);
      this.filterMonuments()
    },

    filterMonuments(): void {
      const userStore = useUser();
      this.monumentsFiltered = [];

      if (!(this.filters.favorite || this.filters.toSee || this.filters.visited || this.filters.notVisited)) {
        this.monumentsFiltered = this.monumentsTemp;
      }
      if (this.filters.favorite) {
        const favoriteIds = userStore.getCurrentUser.favorites!.map(favorite => favorite.id) ?? [];
        this.monumentsFiltered.push(...this.monumentsTemp.filter(monument => favoriteIds.includes(monument.id)));
      }
      if (this.filters.toSee) {
        const toSeeIds = userStore.getCurrentUser.toSee!.map(toSee => toSee.id) ?? [];
        this.monumentsFiltered.push(...this.monumentsTemp.filter(monument => toSeeIds.includes(monument.id)));
      }

      if (userStore.getCurrentUser.visitedMonument != undefined && userStore.getCurrentUser.visitedMonument != null) {
        if (this.filters.visited) {
          const visitedIds = userStore.getCurrentUser.visitedMonument!.map(visitedMon => visitedMon.id) ?? [];
          this.monumentsFiltered.push(...this.monumentsTemp.filter(monument => visitedIds.includes(monument.id)));
        }
        if (this.filters.notVisited) {
          const visitedIds = userStore.getCurrentUser.visitedMonument!.map(visitedMon => visitedMon.id) ?? [];
          this.monumentsFiltered.push(...this.monumentsTemp.filter(monument => !visitedIds.includes(monument.id)));
        }
      }

      this.sortMonuments(this.sortBy);
    },

    sortMonuments(sortParam: string): void {
      this.sortBy = sortParam;

      if (sortParam == "distance") {
        this.monumentsFiltered.sort((a, b) => {
          return a.distanceBetween - b.distanceBetween;
        });
        this.setMonumentsLimited();
      } else if (sortParam == "likes") {
        this.monumentsFiltered.sort((a, b) => {
          return b.likes - a.likes;
        });
        this.setMonumentsLimited();
      }
    },

    setMonumentsLimited(): void {
      this.monumentsLimited = [];
      this.monumentsLimited.push(...this.monumentsFiltered.slice(this.monumentsLimited.length, this.limit));
    },

    async setMonumentById(idMonument: string) {
      const monumentData = await MonumentService.getMonumentById(idMonument);

      if (monumentData) {
        this.monumentById = monumentData;
        this.visits = await MonumentService.getVisitsForMonument(idMonument);
        this.circuits = await CircuitService.getCircuitsForMonument(idMonument);
        const monumentLocation = [this.monumentById.geoPoint.latitude, this.monumentById.geoPoint.longitude]
        this.nearMonuments = await MonumentService.getNearMonuments(idMonument, monumentLocation as Geopoint);
      } else {
        router.push("/404");
      }
    },


    // -------------------------- SEED MONUMENTS----------------------------------------------------------

    async seedMonuments() {
      await SeedService.seedMonuments(drummondMonumentsDataJSON, montrealMonumentsDataJSON);
    },

  },
});
