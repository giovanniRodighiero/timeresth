import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import enableSpy from "../../../tools/enableSpy";

/**
 * Styled input field.
 * Accepts all the default html props for the input tag.
 */
function InputField({
    light = false,
    full = false,
    value,
    onChange,
    inputProps = {},
}) {
    const classes = React.useMemo(
        () =>
            classNames(
                {
                    "w-full": full,
                    "border-dark": !light,
                    "border-white": light,
                    "placeholder:text-dark": !light,
                    "text-white": light,
                    "outline-dark": light,
                    "placeholder:text-white": light,
                    "w-16": inputProps?.type === "number",
                },
                "bg-transparent placeholder:opacity-40 pl-2 h-9 border rounded text-lg uppercase"
            ),
        [full, light]
    );

    return (
        <input
            {...inputProps}
            className={classes}
            value={value}
            onChange={onChange}
        />
    );
}

InputField.propTypes = {
    /**
     * Should be displayed with the light colors
     */
    light: PropTypes.bool,

    /**
     * Should be displayed as full width
     */
    full: PropTypes.bool,

    /**
     * Current input value, useful for controlled inputs
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * onChange event callback, useful for controlled inputs
     */
    onChange: PropTypes.func,

    /**
     * Default html input attributes, forwared to the input element
     */
    inputProps: PropTypes.object,
};

export default enableSpy(InputField);
