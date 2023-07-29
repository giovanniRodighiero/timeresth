import React from "react";

interface ExerciseNameProps {
    /** Timer is running training time or rest/brak */
    isWorkTime?: boolean;

    /** Exercise name to display */
    exercise: string;
}

function ExerciseName({ isWorkTime = false, exercise }: ExerciseNameProps) {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center rounded bg-white shadow-md">
            <p className="mb-1 font-sans text-lg font-light">
                {isWorkTime ? "now doing" : "up next"}
            </p>
            <span className="font-serif text-3xl">{exercise}</span>
        </div>
    );
}

export default ExerciseName;
