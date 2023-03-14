import { UserResponse } from "@supabase/supabase-js";
import { createContext, JSX, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import createAuth from "./createAuth";

export type AppContextState = {
  readonly token: string | null;
  readonly currentUser: UserResponse | undefined;
  readonly appName: string;
};

export type AppContextValue = [state: AppContextState, actions: any];

const defaultState = {
  token: null,
  currentUser: undefined,
  appName: "balance"
};

const StoreContext = createContext<AppContextValue>([defaultState, {}]);

export function Provider(props: { children: JSX.Element }) {
  const [state, setState] = createStore<AppContextState>({
    get currentUser() {
      return currentUser();
    },
    token: localStorage.getItem("jwt"),
    appName: "balance"
  });
  const actions = {};

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
