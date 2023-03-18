import { createContext, createEffect, JSX, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { User } from "../models/user";
import createAuth, { AuthActions } from "./createAuth";

export type AppContextState = {
    readonly token: string | null;
    readonly currentUser: User | undefined;
    readonly appName: string;
    readonly sidebarActive: boolean;
};

export type AppActions = {
    setSidebarActive: (state: boolean) => void;
};
export type StoreActions = AppActions & AuthActions;
export type AppContextValue = [state: AppContextState, actions: StoreActions];

const defaultState = {
    currentUser: undefined,
    appName: "balance",
    token: null,
    sidebarActive: true
};

const StoreContext = createContext<AppContextValue>([
    defaultState,
    {} as StoreActions
]);

export function Provider(props: { children: JSX.Element }) {
    const [state, setState] = createStore<AppContextState>({
        get currentUser() {
            return currentUser();
        },
        appName: "balance",
        token: localStorage.getItem("ba-jwt"),
        sidebarActive: !!localStorage.getItem("ba-sidebar-active")
    });
    const actions = {
        setSidebarActive(state: boolean) {
            setState({ sidebarActive: state });
        }
    } as StoreActions;

    createEffect(() => {
        state.token
            ? localStorage.setItem("ba-jwt", state.token)
            : localStorage.removeItem("ba-jwt");
    });

    createEffect(() => {
        state.sidebarActive
            ? localStorage.setItem("ba-sidebar-active", JSON.stringify(true))
            : localStorage.removeItem("ba-sidebar-active");
    });

    const currentUser = createAuth(actions, setState);

    return (
        <StoreContext.Provider value={[state, actions]}>
            {props.children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    return useContext(StoreContext);
}
