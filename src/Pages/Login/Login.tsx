import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import supabaseClient from "../../services/supabaseClient";
import { useAuth } from "../../services/auth";
import { Navigate } from "react-router-dom";

function Login() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) return <Navigate to="/" replace />;

    return (
        <main className="mx-auto max-w-sm">
            <Auth
                supabaseClient={supabaseClient}
                appearance={{ theme: ThemeSupa }}
            />
        </main>
    );
}

export default Login;
