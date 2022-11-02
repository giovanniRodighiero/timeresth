import React from "react";
import { useNavigate } from "react-router-dom";

import TopBar from "../../Components/TopBar";
import WorkoutEdit from "../../Components/WorkoutEdit";

/**
 * Update workout page
 */
function WorkoutUpdate() {
    const navigate = useNavigate();

    const onWorkoutDelete = () => console.log("onDeleteWorkout");
    const onBack = () => {
        navigate("/workouts");
    };

    return (
        <div>
            <TopBar
                onBack={onBack}
                onDelete={onWorkoutDelete}
                title="Update workout"
            />
            <WorkoutEdit />
        </div>
    );
}

export default WorkoutUpdate;
