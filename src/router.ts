import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "@/shared/guards";
import { useUser } from "./shared/stores";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/firebase";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("./features/HomePage/views/HomePage.vue"),
    },
    {
      path: "/interactiveMap",
      name: "InteractiveMapPage",
      component: () => import("./features/InteractiveMapPage/views/InteractiveMapPage.vue"),
    },
    {
      path: "/monuments/:id",
      name: "MonumentPage",
      component: () => import("./features/MonumentPage/views/MonumentPage.vue"),
    },
    {
      path: "/register",
      name: "RegisterPage",
      beforeEnter: [isAuthenticatedGuard],
      component: () => import("./features/AuthenticationPage/views/AuthenticationPage.vue"),
    },
    {
      path: "/login",
      name: "LoginPage",
      beforeEnter: [isAuthenticatedGuard],
      component: () => import("./features/AuthenticationPage/views/AuthenticationPage.vue"),
    },
    {
      path: "/profile",
      name: "UserPage",
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import("./features/UserPage/views/UserPage.vue"),
    },
    {
      path: "/download",
      name: "DownloadPage",
      component: () => import("./features/DownloadPage/views/DownloadPage.vue"),
    },
    {
      path: "/circuits/:id",
      name: "CircuitPage",
      component: () => import("./features/CircuitPage/views/CircuitPage.vue"),
    },
    {
      path: "/admin",
      name: "AdminPage",
      // beforeEnter: [AdminGuard],
      component: () => import("./features/Admin/views/AdminPage.vue"),
    },
    {
      path: "/:notfound(.*)*",
      component: () => import("./views/NotFoundPage.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      switch (to.hash) {
        case "#tosee": return { el: "#tosee", top: 100 };
        case "#liked": return { el: "#liked", top: 100 };
        case "#visited": return { el: "#visited", top: 100 };
        case "#circuit-made": return { el: "#circuit-made", top: 100 };
        case "#profile-reviews": return { el: "#profile-reviews", top: 100 };
        case "#contact": return { el: "#contact", top: 88 };
        case "#monuments-list": return { el: "#monuments-list", top: 65 };
        case "#add-monument": return { el: "#add-monument", top: 65 };
        case "#circuits-list": return { el: "#circuits-list", top: 65 };
        case "#add-circuit": return { el: "#add-circuit", top: 65 };
        default: return { top: 0 };
      }
    } else {
      return { top: 0 };
    };
  },
});

router.beforeEach(async () => {
  onAuthStateChanged(auth, (firebaseUser) => {
    const userStore = useUser();
    if (firebaseUser?.isAnonymous) {
      userStore.getCurrentUser.connectionState = 0;
    } else {
      userStore.getCurrentUser.connectionState = 1;
    }
  });
});