import React from "react";

import SessionContext from "./SessionContext";

function useAuth() {
    return React.useContext(SessionContext);
}

export default useAuth;
