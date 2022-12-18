import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import produce from "immer";

import TopBar from "../../Components/TopBar";
import WorkoutEdit from "../../Components/WorkoutEdit";

import workoutEditReducer, {
    ACTIONS,
} from "../../Components/WorkoutEdit/reducer";
import { getWorkout, updateWorkout } from "../../services/Api";

type RouteParams = {
    workoutId: string;
};

/**
 * Update workout page
 */
function WorkoutUpdate() {
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

    const onWorkoutDelete = () => console.log("onDeleteWorkout");
    const onBack = async () => {
        if (workout.hasChanges) await saveWorkout();
        navigate("/workouts");
    };
    const fetchWorkout = async () => {
        setLoading(true);
        const result = await getWorkout(workoutId);
        if (result.error) {
        } else if (result.workout) {
            workoutDispatch({
                type: ACTIONS.INIT,
                payload: result.workout,
            });
        }
        setLoading(false);
    };
    const saveWorkout = async () => {
        await updateWorkout(workoutId, workout);
        return true;
    };

    React.useEffect(() => {
        fetchWorkout();
    }, []);

    return (
        <div>
            <TopBar onBack={onBack} title="Update workout" />
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
