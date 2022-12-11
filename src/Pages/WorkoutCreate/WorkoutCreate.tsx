import React from "react";
import { useNavigate } from "react-router-dom";
import produce from "immer";

import TopBar from "../../Components/TopBar";
import WorkoutEdit from "../../Components/WorkoutEdit";
import workoutEditReducer from "../../Components/WorkoutEdit/reducer";

/**
 * Create workout page
 */
function WorkoutCreate() {
    const [workout, workoutDispatch] = React.useReducer(
        produce(workoutEditReducer),
        {
            hasChanges: false,
            id: 123,
            name: "new workout",
            rounds: [{ repeat: 1, break: 45, exercises: [] }],
        }
    );
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
                title="New workout"
            />
            <WorkoutEdit workout={workout} workoutDispatch={workoutDispatch} />
        </div>
    );
}

export default WorkoutCreate;
