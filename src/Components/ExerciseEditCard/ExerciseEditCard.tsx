import React from "react";
import { Trash2 } from "react-feather";

import { EditableExercise } from "../../types/exercise.interface";
import InputField from "../InputField";
import ExerciseEditCardParameter from "../ExerciseEditParameter";

type FieldName = "name" | "repeat" | "work" | "rest";
type FieldValue<T> = T extends "name" ? string : number;

interface ExerciseEditCardProps {
    exercise: EditableExercise;
    onUpdateExercise: <A extends FieldName>(
        fieldName: A,
        value: FieldValue<A>
    ) => void;
    onDeleteExercise?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

function ExerciseEditCard({
    exercise,
    onUpdateExercise,
    onDeleteExercise,
}: ExerciseEditCardProps) {
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
                { !!onDeleteExercise && <button
                    className="ml-2 flex justify-center"
                    onClick={onDeleteExercise}
                    aria-label="delete exercise"
                >
                    <Trash2 size={28} />
                </button>}
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

export default ExerciseEditCard;
