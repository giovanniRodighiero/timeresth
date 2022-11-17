import React from "react";
import classNames from "classnames";

import InputField from "../InputField";
import { PlusBtn, MinusBtn } from "../CircleBtns/CircleBtns";

interface ExerciseEditCardParameterProps {
    /** Has light theme */
    light?: boolean;

    /** Input label */
    label: string;

    /** Input minimum value allowed */
    min?: number;

    /** Input current value */
    value: number;

    /** Function to change the input value */
    setValue: (newValue: number | "") => void;
}

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
}: ExerciseEditCardParameterProps) {
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
    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const { value } = e.target;
        const valueAsNumber = parseInt(value);
        if (!isNaN(valueAsNumber)) setValue(valueAsNumber);
        else setValue("");
    };
    const onPlusClick = () => setValue(value + 1);
    const onMinusClick = () => {
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

export default ExerciseEditCardParameter;
