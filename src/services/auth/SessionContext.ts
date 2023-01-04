import React from "react";

interface SessionContextType {
    isLoading: boolean;
    isLoggedIn: boolean;
    logout: () => Promise<boolean>;
}

const SessionContext = React.createContext<SessionContextType>({
    isLoggedIn: false,
    isLoading: false,
    logout: async () => true,
});

export default SessionContext;
