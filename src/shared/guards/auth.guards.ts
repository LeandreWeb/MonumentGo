import { useUser } from "@/shared/stores";

export function isAuthenticatedGuard(to, from, next) {
  const userStore = useUser();

  setTimeout(() => {
    if (userStore.getCurrentUser.connectionState === 1) {
      next("/profile");
    } else {
      next();
    }
  }, 400);
}

export function isNotAuthenticatedGuard(to, from, next) {
  const userStore = useUser();

  if (userStore.getCurrentUser.connectionState === 0) {
    next("/register");
  } else {
    next();
  }
}

