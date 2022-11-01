import React from "react";
import { Trash2 } from "react-feather";
import PropTypes from "prop-types";

import { exercisePropTypes } from "./../../types/exercise";
import InputField from "../InputField";
import ExerciseEditCardParameter from "../ExerciseEditParameter";

/**
 * Card with inputs to edit an exercise from the current workout.
 * @param {Object} props - props
 * @param {import("./../../types/exercise").Exercise} props.exercise - Exercise.
 */
function ExerciseEditCard({ exercise, onUpdateExercise, onDeleteExercise }) {
    const onNameChange = e => onUpdateExercise("name", e.target.value);
    const onRepeatChange = repeat => onUpdateExercise("repeat", repeat);
    const onWorkChange = work => onUpdateExercise("work", work);
    const onRestChange = rest => onUpdateExercise("rest", rest);

    return (
        <article className="h-52 max-w-sm cursor-grab rounded-md bg-main p-2 drop-shadow-lg">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <InputField
                        full
                        light
                        value={exercise.name}
                        onChange={onNameChange}
                        inputProps={{ placeholder: "exercise name" }}
                    />
                </div>
                <button
                    className="ml-2 flex justify-center"
                    onClick={onDeleteExercise}
                    aria-label="delete exercise"
                >
                    <Trash2 size={28} />
                </button>
            </div>

            <ExerciseEditCardParameter
                light
                label="repeat"
                min={1}
                setValue={onRepeatChange}
                value={exercise.repeat}
            />
            <ExerciseEditCardParameter
                light
                label="work"
                min={1}
                setValue={onWorkChange}
                value={exercise.work}
            />
            <ExerciseEditCardParameter
                light
                label="rest"
                min={0}
                setValue={onRestChange}
                value={exercise.rest}
            />
        </article>
    );
}

ExerciseEditCard.propTypes = {
    /**
     * Exercise object
     */
    exercise: exercisePropTypes.isRequired,

    /**
     * On value update callback
     */
    onUpdateExercise: PropTypes.func.isRequired,

    /**
     * On exercise delete callback
     */
    onDeleteExercise: PropTypes.func.isRequired,
};

export default ExerciseEditCard;
