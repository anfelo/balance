import { Component, createComputed, createSignal } from "solid-js";
import { useStore } from "./store";

const App: Component = () => {
  const [store, { pullUser }] = useStore();
  const [appLoaded, setAppLoaded] = createSignal(false);

  if (!store.token) setAppLoaded(true);
  else {
    console.log(store.currentUser);
    pullUser();
    createComputed(() => store.currentUser && setAppLoaded(true));
  }
  return (
    <div>
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
