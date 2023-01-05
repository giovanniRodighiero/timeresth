import React from "react";

import supabaseClient from "../supabaseClient";
import SessionContext from "./SessionContext";

function SessionProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const logout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (!error) return true;
        console.log(error);
        return false;
    };

    React.useEffect(() => {
        setIsLoading(true);
        supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log(event, session);
            if (event === "SIGNED_OUT") setIsLoggedIn(false);
            if (event === "SIGNED_IN") setIsLoggedIn(true);
        });
        supabaseClient.auth.getSession().then(({ data }) => {
            console.log(data.session);
            if (data.session) setIsLoggedIn(true);
            setIsLoading(false);
        });
    }, []);

    return (
        <SessionContext.Provider value={{ isLoggedIn, isLoading, logout }}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionProvider;
