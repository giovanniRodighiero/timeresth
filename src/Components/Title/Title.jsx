import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

/**
 * Generic heading component.
 */
function Title({ tag: Tag = "h1", color = "dark", children }) {
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

Title.propTypes = {
    /**
     * Which heading tag to render
     */
    tag: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),

    /**
     * Which color to use
     */
    color: PropTypes.oneOf(["white", "dark", "main"]),

    /**
     * Contents displayed
     */
    children: PropTypes.node.isRequired,
};

export default Title;
