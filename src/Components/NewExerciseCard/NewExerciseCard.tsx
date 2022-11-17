import React from "react";
import { PlusCircle } from "react-feather";

import Title from "../Title";

interface NewExerciseCardProps {
    /** Component's click callback. */
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * New exercise card placeholder, last element of the exercises row inside the workout edit page.
 * Simple gray card with title and icon.
 */
function NewExerciseCard({ onClick }: NewExerciseCardProps) {
    return (
        <button
            onClick={onClick}
            className="flex h-52 w-full max-w-md flex-col items-center justify-around rounded-md bg-gray-300 drop-shadow-md"
        >
            <Title tag="h2" color="white">
                Add exercise
            </Title>
            <PlusCircle size={50} className="text-white" focusable={false} />
        </button>
    );
}

export default NewExerciseCard;
