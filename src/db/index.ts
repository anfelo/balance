import { createClient } from "@supabase/supabase-js";
import { User } from "../models/user";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const sb = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
    Auth: {
        async signInWithEmailAndPassword(email: string, password: string) {
            const { data, error } = await sb.auth.signInWithPassword({
                email,
                password
            });

            if (error || !data?.user) {
                return { user: null, session: null };
            }

            return data;
        },
        async register(email: string, password: string) {
            const { data, error } = await sb.auth.signUp({ email, password });

            if (error || !data?.user) {
                return { user: null, session: null };
            }

            return data;
        },
        async getUser() {
            const { data, error } = await sb.auth.getUser();

            if (error || !data?.user) {
                return undefined;
            }

            return User.from(data.user);
        },
        async signOut() {
            const { error } = await sb.auth.signOut();

            if (error) {
                throw error;
            }
        }
    }
};
