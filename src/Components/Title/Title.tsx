import React from "react";
import classNames from "classnames";

interface TitleInterface {
    /** Which heading tag to render */
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    /** Which color to use */
    color?: "white" | "dark" | "main";

    /** Contents displayed */
    children: React.ReactNode;
}

/**
 * Generic heading component.
 */
function Title({ tag: Tag = "h1", color = "dark", children }: TitleInterface) {
    const colorClass = {
        "text-main": color === "main",
        "text-dark": color === "dark",
        "text-white": color === "white",
    };

    return (
        <Tag
            className={classNames("font-serif text-4xl uppercase", colorClass)}
        >
            {children}
        </Tag>
    );
}

export default Title;
