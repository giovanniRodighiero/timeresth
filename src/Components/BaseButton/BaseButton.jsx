import React from "react";

/**
 * Base Button component.
 * Inherits all the default html button props.
 */
function BaseButton({ children, ...props }) {
    return (
        <button
            {...props}
            className="h-10 w-full max-w-[160px] rounded-2xl bg-main text-xl uppercase text-white shadow-md"
        >
            {children}
        </button>
    );
}

export default BaseButton;
