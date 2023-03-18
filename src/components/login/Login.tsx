import { createSignal, Show } from "solid-js";
import { useStore } from "../../store";

import "./Login.scss";

type AuthForm = {
    email: string;
    password: string;
    passwordConfirm: string;
};

export default function Login() {
    const [_, { login, register }] = useStore();
    const [isSignIn, setIsSignIn] = createSignal<boolean>(true);
    const [authForm, setAuthForm] = createSignal<AuthForm>({
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [isSubmitting, setIsSubmitting] = createSignal<boolean>(false);

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        setIsSubmitting(true);

        if (isSignIn()) {
            login(authForm().email, authForm().password);
        } else {
            register(authForm().email, authForm().password);
        }

        setIsSubmitting(false);
    };

    const handleAuthFormChange = (changes: Partial<AuthForm>) => {
        setAuthForm((state) => ({ ...state, ...changes }));
    };

    return (
        <section class="login-form hero is-light is-fullheight">
            <div class="hero-body">
                <form onSubmit={handleSubmit}>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                                class="input"
                                type="email"
                                value={authForm().email}
                                onInput={(e: any) =>
                                    handleAuthFormChange({
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                                class="input"
                                type="password"
                                value={authForm().password}
                                onInput={(e: any) =>
                                    handleAuthFormChange({
                                        password: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>

                    <Show when={!isSignIn()}>
                        <div v-if="!isSignIn" class="field">
                            <label class="label">Confirm password</label>
                            <div class="control">
                                <input
                                    class="input"
                                    type="password"
                                    value={authForm().passwordConfirm}
                                    onInput={(e: any) =>
                                        handleAuthFormChange({
                                            passwordConfirm: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </Show>

                    <div class="field is-grouped">
                        <div class="control">
                            <button
                                type="submit"
                                class="button is-dark"
                                classList={{ "is-loading": isSubmitting() }}
                            >
                                Submit
                            </button>
                        </div>
                        <div class="control">
                            <button
                                type="button"
                                class="button is-ghost"
                                onClick={() => setIsSignIn(!isSignIn())}
                            >
                                {isSignIn() ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
