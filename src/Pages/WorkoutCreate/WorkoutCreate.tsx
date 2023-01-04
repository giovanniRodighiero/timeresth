import React from "react";
import { useNavigate } from "react-router-dom";
import produce from "immer";

import TopBar from "../../Components/TopBar";
import WorkoutEdit from "../../Components/WorkoutEdit";
import workoutEditReducer from "../../Components/WorkoutEdit/reducer";
import { createWorkout } from "../../services/Api";

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

    const saveWorkout = async () => {
        await createWorkout(workout);
        return true;
    };
    const onBack = async () => {
        if (workout.hasChanges) await saveWorkout();
        navigate("/workouts");
    };

    return (
        <div>
            <TopBar onBack={onBack} title="New workout" />
            <WorkoutEdit workout={workout} workoutDispatch={workoutDispatch} />
        </div>
    );
}

export default WorkoutCreate;
