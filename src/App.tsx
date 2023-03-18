import { Route, Routes, useNavigate } from "@solidjs/router";
import { Component, createComputed, createSignal, Show } from "solid-js";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { useStore } from "./store";

const App: Component = () => {
    const [store, { pullUser }] = useStore();
    const [appLoaded, setAppLoaded] = createSignal(false);
    const navigate = useNavigate();

    if (!store.token) {
        setAppLoaded(true);
        navigate("/login", { replace: true });
    } else {
        pullUser();
        createComputed(
            () =>
                store.currentUser &&
                setAppLoaded(true) &&
                navigate("/", { replace: true })
        );
    }

    return (
        <>
            <Show
                when={appLoaded()}
                fallback={
                    <div class="main-loader">
                        <span class="app-loader"></span>
                    </div>
                }
            >
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </Routes>
            </Show>
        </>
    );
};

export default App;
