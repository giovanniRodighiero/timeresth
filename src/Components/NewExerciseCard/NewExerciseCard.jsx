import React from "react";
import { PlusCircle } from "react-feather";
import PropTypes from "prop-types";

import Title from "../Title";

/**
 * New exercise card placeholder, last element of the exercises row inside the workout edit page.
 * Simple gray card with title and icon.
 */
function NewExerciseCard({ onClick }) {
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

NewExerciseCard.propTypes = {
    /**
     * Component's click callback.
     */
    onClick: PropTypes.func.isRequired,
};

export default NewExerciseCard;
