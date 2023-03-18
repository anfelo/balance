import { useStore } from "../../store";
import Sidebar from "../sidebar/Sidebar";

import "./Home.scss";

export default function Home() {
    const [_, { setSidebarActive }] = useStore();

    return (
        <>
            <Sidebar />
            <button
                class="button is-white open-menu-button"
                onClick={() => setSidebarActive(true)}
            >
                <span class="icon is-small">
                    <i class="fas fa-bars"></i>
                </span>
            </button>
            <main class="container"></main>
        </>
    );
}
