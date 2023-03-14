import { createSignal, createResource, batch } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { IAppState } from ".";
import { db } from "../db";

export default function createAuth(
  actions: any,
  setState: SetStoreFunction<IAppState>
) {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [currentUser, { mutate }] = createResource(loggedIn, db.Auth.getUser);

  Object.assign(actions, {
    pullUser: () => setLoggedIn(true),
    async login(email: string, password: string) {
      const { user, session } = await db.Auth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!user) return null;

      actions.setToken(session);
      setLoggedIn(true);
    },
    async logout() {
      await db.Auth.signOut();
      batch(() => {
        setState({ token: undefined });
        mutate(undefined);
      });
    }
  });
  return currentUser;
}
