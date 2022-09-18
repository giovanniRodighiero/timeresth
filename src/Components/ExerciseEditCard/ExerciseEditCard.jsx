import React from "react";
import { Trash2 } from "react-feather";

import InputField from "../InputField";
import ParameterRow from "./ParameterRow";

function WorkoutEditCard({ onDeleteExercise }) {
    const [values, setValue] = React.useState({ repeat: 1, work: 1, rest: 0 });
    const onExRepeatChange = repeat => {
        setValue(prev => ({ ...prev, repeat }));
    };
    const onExWorkChange = work => {
        setValue(prev => ({ ...prev, work }));
    };
    const onExRestChange = rest => {
        setValue(prev => ({ ...prev, rest }));
    };

    return (
        <article className="rounded bg-main p-2 drop-shadow-lg">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <InputField
                        full
                        light
                        inputProps={{ placeholder: "exercise name" }}
                    />
                </div>
                <button
                    className="ml-2 flex justify-center"
                    onClick={onDeleteExercise}
                >
                    <Trash2 size={28} />
                </button>
            </div>

            <ParameterRow
                label="Repeat"
                min={1}
                setValue={onExRepeatChange}
                value={values.repeat}
            />
            <ParameterRow
                label="Work"
                min={1}
                setValue={onExWorkChange}
                value={values.work}
            />
            <ParameterRow
                label="Rest"
                setValue={onExRestChange}
                value={values.rest}
            />
        </article>
    );
}

export default WorkoutEditCard;
