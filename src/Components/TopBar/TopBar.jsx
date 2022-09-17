import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "react-feather";
import PropTypes from "prop-types";

/**
 * Navigation element on top of the page.
 * It is used in the update and create workout page.
 */
function TopBar({ title, onDelete }) {
    return (
        <nav className="relative mb-2 flex h-12 items-center justify-between border-b border-b-slate-200 px-2.5">
            <Link to="/workouts" aria-label="Go back to workouts">
                <ArrowLeft size={34} />
            </Link>

            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium">
                {title}
            </p>

            {!!onDelete && (
                <button aria-label="Delete workout" onClick={onDelete}>
                    <Trash2 size={30} />
                </button>
            )}
        </nav>
    );
}

TopBar.propTypes = {
    /**
     * Title displayed in the center.
     */
    title: PropTypes.string.isRequired,

    /**
     * Callback for the delete button, if it's missing the button gets hidden.
     */
    onDelete: PropTypes.func,
};

export default TopBar;
