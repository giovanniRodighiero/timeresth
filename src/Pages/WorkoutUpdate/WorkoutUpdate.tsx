import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import produce from "immer";

import TopBar from "../../Components/TopBar";
import WorkoutEdit from "../../Components/WorkoutEdit";
import ModalWorkoutChanges from "../../Components/ModalWorkoutChanges";

import workoutEditReducer, {
    ACTIONS,
} from "../../Components/WorkoutEdit/reducer";
import { deleteWorkout, getWorkout, updateWorkout } from "../../services/Api";
import Workout from "../../types/workout.interface";

type RouteParams = {
    workoutId: string;
};

/**
 * Update workout page
 */
function WorkoutUpdate() {
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(true);
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
    const { workoutId: idAsString } = useParams<RouteParams>() as RouteParams;
    const workoutId = React.useMemo(() => parseInt(idAsString), [idAsString]);

    /** MODAL */
    const onModalClose = () => setIsModalVisible(false);
    const onSaveChanges = async () => {
        await updateWorkout(workoutId, workout as Workout);
        navigate("/");
    };
    const onDiscardChanges = () => navigate("/");

    /** PAGE */
    const onBack = () => {
        if (workout.hasChanges) setIsModalVisible(true);
        else navigate("/");
    };

    /** WORKOUT CRUD */
    const onWorkoutDelete = async () => {
        await deleteWorkout(workoutId);
        navigate("/");
    };
    const fetchWorkout = async () => {
        setLoading(true);
        const result = await getWorkout(workoutId);
        if (result.error) {
            //FIXME: handle errors
        } else if (result.workout) {
            workoutDispatch({
                type: ACTIONS.INIT,
                payload: result.workout,
            });
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchWorkout();
    }, []);

    return (
        <div>
            <ModalWorkoutChanges
                isVisible={isModalVisible}
                onClose={onModalClose}
                onDiscardChanges={onDiscardChanges}
                onSaveChanges={onSaveChanges}
            />
            <TopBar
                onBack={onBack}
                title="Update workout"
                onDelete={onWorkoutDelete}
            />
            {!isLoading && (
                <WorkoutEdit
                    workout={workout}
                    workoutDispatch={workoutDispatch}
                />
            )}
        </div>
    );
}

export default WorkoutUpdate;
