import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { Navigate } from "react-router-dom";

import Title from "../../Components/Title";
import supabaseClient from "../../services/supabaseClient";
import { useAuth } from "../../services/auth";

function Login() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) return <Navigate to="/" replace />;

    return (
        <main className="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2">
            <div className="mb-5">
                <Title color="main">Timeresth</Title>
            </div>
            <Auth
                supabaseClient={supabaseClient}
                appearance={{ theme: ThemeSupa }}
                providers={["google"]}
            />
        </main>
    );
}

export default Login;
