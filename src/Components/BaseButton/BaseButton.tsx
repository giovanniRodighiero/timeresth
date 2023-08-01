import React from "react";
import classNames from "classnames";

interface BaseButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    children: React.ReactNode;
}

/**
 * Base Button component.
 * Inherits all the default html button props.
 */
function BaseButton({ children, primary = true, ...props }: BaseButtonProps) {
    const styles = classNames(
        "h-10 w-full max-w-[160px] rounded-2xl text-xl uppercase shadow-md",
        {
            "bg-main": primary,
            "text-white": primary,
            "border-2": !primary,
            "border-main": !primary,
            "bg-white": !primary,
            "text-main": !primary,
        }
    );

    return (
        <button {...props} className={styles}>
            {children}
        </button>
    );
}

export default BaseButton;
