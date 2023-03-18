import { createSignal, createResource, batch } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { AppContextState } from ".";
import { db } from "../db";

export type AuthActions = {
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
    pullUser: () => boolean;
};

export default function createAuth(
    actions: any,
    setState: SetStoreFunction<AppContextState>
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

            if (!user || !session) return null;

            actions.setToken(session.access_token);
            setLoggedIn(true);
        },
        async register(email: string, password: string) {
            const { user, session } = await db.Auth.register(email, password);

            if (!user || !session) return null;

            actions.setToken(session.access_token);
            setLoggedIn(true);
        },
        async logout() {
            await db.Auth.signOut();
            batch(() => {
                mutate(undefined);
            });
        },
        setToken(token: string) {
            setState({ token });
        }
    } as AuthActions);
    return currentUser;
}
