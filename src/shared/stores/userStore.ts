import { defineStore } from "pinia";
import { auth } from "@/firebase";
import {  onAuthStateChanged } from "firebase/auth";
import { router } from "@/router";
import type { UserInterface, ReviewInterface } from "@/shared/interfaces";
import { AuthService, CircuitService, MonumentService, UserService } from "@/shared/services";
import { useMonuments } from "@/shared/stores/index";

interface UserStateInterface {
  currentUser: UserInterface | null | undefined;
  error: any;
}

export const useUser = defineStore("user", {
  state: (): UserStateInterface => ({
    currentUser: {
      connectionState: 0,
      id: "",
      age: 0,
      email: "",
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      toSee: [],
      favorites: [],
      visitedMonument: [],
      finishedCircuits: [],
      reviews: [],
    },
    error: null,
  }),

  getters: {
    getCurrentUser(): UserInterface {
      return this.currentUser;
    },
    getConnectionState() {
      return this.connectionState;
    },
    getIsVisited(): boolean {
      return this.currentUser.isVisited;
    },
  },

  actions: {

    async initUserState() {
      onAuthStateChanged(auth, async (user) => {
        if (user?.isAnonymous == false) {
          // console.log(user.uid);

          UserService.getUser(async (doc) => {
            this.currentUser.connectionState = 1;
            this.currentUser.id = doc.id;
            this.currentUser.email = doc.data()!.email;
            this.currentUser.username = doc.data()!.username;
            this.currentUser.firstname = doc.data()!.firstname;
            this.currentUser.lastname = doc.data()!.lastname;
            this.currentUser.age = doc.data()!.age;
            this.currentUser.phoneNumber = doc.data()!.phoneNumber;
            this.currentUser.toSee = await MonumentService.getMonumentsByIds(doc.data()!.toSee);
            this.currentUser.favorites = await MonumentService.getMonumentsByIds(doc.data()!.favorites);
            this.currentUser.visitedMonument = await UserService.getListOfVisitedMonuments(doc.id);
            this.currentUser.finishedCircuits = await CircuitService.getCircuitsByIds(doc.data()!.finishedCircuits);
            this.currentUser.reviews = await UserService.getListOfReviews(doc.id);
          });

        } else {
          if (!user) {
            await this.loginAnonymousUser();
            this.currentUser = {
              connectionState: 0,
              id: "",
              email: "",
              age: "",
              username: "",
              firstname: "",
              lastname: "",
              phoneNumber: "",
              toSee: [],
              favorites: [],
              finishedCircuits: [],
            };
            return;
          }
        }
        // console.log(this.currentUser);
      });
    },

    async registerUser(credentials) {
      try {
        await AuthService.createUser(credentials);
        this.error = null;
        router.push("/profile");
      } catch (error: any) {
        this.error = error;
      }
    },

    async loginUserWithFacebook() {
      try {
        await AuthService.loginWithFacebook();
        this.error = null;
        router.push("/profile");
      } catch (error: any) {
        this.error = error;
      }
    },

    async loginUserWithGoogle() {
      try {
        await AuthService.loginWithGoogle();
        this.error = null;
        router.push("/profile");
      } catch (error: any) {
        this.error = error;
      }
    },

    async loginUser(credentials) {
      try {
        await AuthService.signIn(credentials);
        this.error = null;
        router.push('/profile');
      } catch (error) {
        this.error = 'Erreur d\'authentification';
      }
    },

    async loginAnonymousUser() {
      try {
        await AuthService.signInAnonymously();
        this.error = null;
      } catch (error) {
        this.error = 'Erreur d\'authentification';
      }
    },

    async logoutUser() {
      try {
        await AuthService.signOut();
        this.error = null;
        router.push('/login');
      } catch (error) {
        this.error = 'Erreur de déconnection';
      }
    },

    async changeUserInfos(user: any) {
      try {
        await UserService.changeUserInfos(user);
      } catch (error: any) {
        this.error = error;
      }
    },

    async IsMonumentVisitedByUser(idMonument: string) {
      const isVisited = await UserService.getIsMonumentVisitedByUser(idMonument);
      this.currentUser.isVisited = isVisited;
    },

    async toggleMonumentLike(idMonument: string) {
      try {
        await UserService.toggleMonumentLike(idMonument);
      } catch (error: any) {
        this.error = error;
      }
    },

    async toggleMonumentToSee(idMonument: string) {
      try {
        await UserService.toggleMonumentToSee(idMonument);
      } catch (error: any) {
        this.error = error;
      }
    },

    async deleteReview(idMonument: string) {
      try {
        await UserService.deleteReview(idMonument);
      } catch (error: any) {
        this.error = error;
      }
    },

    async addAndUpdateReview(review: ReviewInterface) {
      try {
        await UserService.addAndUpdateReview(review);

        useMonuments().visits = useMonuments().visits.filter((reviews: any) => reviews.idUser != review.idUser)
        if (this.currentUser.reviews.filter((review: any) => review.idMonument == review.idMonument).length == 0) {
          this.currentUser.reviews.push(review);
          useMonuments().visits.push(review);
        } else {
          for (let i = 0; i < this.currentUser.reviews.length; i++) {
            if (this.currentUser.reviews[i].idMonument == review.idMonument) {
              useMonuments().visits.push(review);
            };
          };
        }
      } catch (error: any) {
        this.error = error;
      }
    },

  },
});
