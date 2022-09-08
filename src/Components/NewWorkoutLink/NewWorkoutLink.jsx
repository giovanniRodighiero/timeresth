import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "react-feather";

import Title from "../Title";

/**
 * New workout link.
 * Simple gray card with title and icon.
 */
function NewWorkoutLink() {
    return (
        <Link to="/workouts/new">
            <div className="max-w-md h-32 flex flex-col justify-around items-center bg-gray-300 rounded-md drop-shadow-md">
                <Title tag="h2" color="white">
                    Create new
                </Title>
                <PlusCircle
                    size={40}
                    className="text-white"
                    focusable={false}
                />
            </div>
        </Link>
    );
}

export default NewWorkoutLink;
