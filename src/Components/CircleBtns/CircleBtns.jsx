import React from "react";
import classNames from "classnames";
import { Plus, Minus } from "react-feather";
import PropTypes from "prop-types";

const SHARED_STYLES =
    "h-10 w-10 flex justify-center items-center text-center rounded-full border-2";

/**
 * Circular shaped plus button.
 * Can be used inside a form to increase a field value.
 */
export function PlusBtn({ onClick, light = false }) {
    const styles = classNames(
        {
            "text-dark": !light,
            "border-dark": !light,

            "text-white": light,
            "border-white": light,
            "outline-dark": light,
        },
        SHARED_STYLES
    );

    return (
        <button aria-label="Increase" onClick={onClick} className={styles}>
            <Plus size={35} />
        </button>
    );
}
PlusBtn.propTypes = {
    /**
     * On click callback, when the button is pressed.
     */
    onClick: PropTypes.func.isRequired,

    /**
     * Light theme.
     */
    light: PropTypes.bool,
};

/**
 * Circular shaped minus button.
 * Can be used inside a form to decrease a field value.
 */
export function MinusBtn({ onClick, light = false }) {
    const styles = classNames(
        {
            "text-dark": !light,
            "border-dark": !light,

            "text-white": light,
            "border-white": light,
            "outline-dark": light,
        },
        SHARED_STYLES
    );

    return (
        <button aria-label="Decrease" onClick={onClick} className={styles}>
            <Minus size={35} />
        </button>
    );
}
MinusBtn.propTypes = {
    /**
     * On click callback, when the button is pressed.
     */
    onClick: PropTypes.func.isRequired,

    /**
     * Light theme.
     */
    light: PropTypes.bool,
};
