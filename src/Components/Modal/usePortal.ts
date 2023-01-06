import React from "react";

const ROOT_ID = "modal-root";

function usePortal() {
    const portalRef = React.useRef<HTMLElement | null>(null);

    const getPortalRef = () => {
        if (!portalRef.current)
            portalRef.current = document.createElement("div");
        return portalRef.current;
    };

    React.useEffect(() => {
        const rootElement = document.getElementById(ROOT_ID);
        rootElement?.appendChild(getPortalRef());

        return function usePortalCleanup() {
            getPortalRef().remove();
        };
    }, []);

    return getPortalRef();
}

export default usePortal;
