import React from "react";
import { useNavigate } from "react-router-dom";
import produce from "immer";

import TopBar from "../../Components/TopBar";
import WorkoutEdit from "../../Components/WorkoutEdit";
import ModalWorkoutChanges from "../../Components/ModalWorkoutChanges";

import workoutEditReducer from "../../Components/WorkoutEdit/reducer";
import { createWorkout } from "../../services/Api";
import Workout from "../../types/workout.interface";

/**
 * Create workout page
 */
function WorkoutCreate() {
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
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

    /** MODAL */
    const onModalClose = () => setIsModalVisible(false);
    const onSaveChanges = async () => {
        await createWorkout(workout as Workout);
        navigate("/");
        return true;
    };
    const onDiscardChanges = () => navigate("/");

    /** PAGE */
    const onBack = () => {
        if (workout.hasChanges) setIsModalVisible(true);
        else navigate("/");
    };

    return (
        <div>
            <ModalWorkoutChanges
                isVisible={isModalVisible}
                onClose={onModalClose}
                onDiscardChanges={onDiscardChanges}
                onSaveChanges={onSaveChanges}
            />
            <TopBar onBack={onBack} title="New workout" />
            <WorkoutEdit workout={workout} workoutDispatch={workoutDispatch} onSave={onSaveChanges}/>
        </div>
    );
}

export default WorkoutCreate;
