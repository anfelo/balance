import { createSignal, Show } from "solid-js";
import { useStore } from "../../store";

import "./Sidebar.scss";

export default function Sidebar() {
    const [store, { setSidebarActive }] = useStore();
    const [balanceName, setBalanceName] = createSignal<string>("");

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();

        if (!balanceName().trim()) {
            return;
        }
        // addBalance(newBalance);
        console.log("submit", balanceName());

        setBalanceName("");

        // entryName.value.focus();
    };

    return (
        <>
            <Show when={store.sidebarActive}>
                <div
                    class="overlay"
                    onClick={() => setSidebarActive(false)}
                ></div>
            </Show>
            <aside
                class="sidebar menu"
                classList={{ "is-active": store.sidebarActive }}
            >
                <button
                    class="button is-white close-menu-button"
                    onClick={() => setSidebarActive(false)}
                >
                    <span class="icon is-small">
                        <i class="fas fa-arrow-left"></i>
                    </span>
                </button>
                <p class="menu-label px-1">My Balances</p>
                <ul class="menu-list"></ul>
                <form onSubmit={handleSubmit}>
                    <fieldset class="is-flex is-justify-content-space-between">
                        <div class="field">
                            <div class="control has-icons-left">
                                <input
                                    class="input is-white is-inline py-0"
                                    type="text"
                                    placeholder="New balance"
                                    value={balanceName()}
                                    onInput={(e: any) =>
                                        setBalanceName(e.target.value)
                                    }
                                />
                                <span class="icon is-left">
                                    <i class="fas fa-plus"></i>
                                </span>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </aside>
        </>
    );
}
