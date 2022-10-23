import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import InputField from "../InputField";
import { PlusBtn, MinusBtn } from "../CircleBtns/CircleBtns";

import enableSpy from "../../../tools/enableSpy";

/**
 * Input row composed by label, numeric input and plus-minus buttons.
 * It's supposed to be used inside the <WorkoutEditCard />
 */
function ExerciseEditCardParameter({
    light = false,
    label,
    min = 0,
    value,
    setValue,
}) {
    const id = React.useId();
    const labelClasses = classNames(
        {
            "text-dark": !light,
            "text-white": light,
        },
        "text-xl font-medium capitalize"
    );

    const onBlur = () => {
        if (!value || value < min) setValue(min);
    };
    const onInputChange = e => {
        const { value } = e.target;
        setValue(parseInt(value) || "");
    };
    const onPlusClick = _ => setValue(value + 1);
    const onMinusClick = _ => {
        if (value > min) setValue(value - 1);
    };

    return (
        <div className="mt-3 flex w-full items-center justify-between">
            <div className="flex w-36 items-center justify-between">
                <label htmlFor={id} className={labelClasses}>
                    {label}:
                </label>
                <InputField
                    light={light}
                    value={value}
                    onChange={onInputChange}
                    inputProps={{ type: "number", id, onBlur, min }}
                />
            </div>

            <div className="flex items-center">
                <PlusBtn light={light} onClick={onPlusClick} />
                <span className="ml-4">
                    <MinusBtn light={light} onClick={onMinusClick} />
                </span>
            </div>
        </div>
    );
}

ExerciseEditCardParameter.propTypes = {
    /**
     * Has light theme
     */
    light: PropTypes.bool,

    /**
     * Input label
     */
    label: PropTypes.string.isRequired,

    /**
     * Input minimum value allowed
     */
    min: PropTypes.number,

    /**
     * Input current value
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

    /**
     * Function to change the input value
     */
    setValue: PropTypes.func.isRequired,
};

export default enableSpy(ExerciseEditCardParameter);
