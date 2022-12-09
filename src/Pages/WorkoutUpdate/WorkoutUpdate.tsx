import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import TopBar from "../../Components/TopBar";
import WorkoutEdit from "../../Components/WorkoutEdit";
import Workout from "../../types/workout.interface";
import { getWorkout } from "../../services/Api";

type RouteParams = {
    workoutId: string;
};

/**
 * Update workout page
 */
function WorkoutUpdate() {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [workout, setWorkout] = React.useState<Workout | null>();
    const navigate = useNavigate();
    const { workoutId } = useParams<RouteParams>() as RouteParams;

    const onWorkoutDelete = () => console.log("onDeleteWorkout");
    const onBack = () => {
        navigate("/workouts");
    };
    const fetchWorkout = async () => {
        setLoading(true);
        const result = await getWorkout(parseInt(workoutId));
        if (result.error) {
        } else {
            setWorkout(result.workout);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchWorkout();
    }, []);

    return (
        <div>
            <TopBar
                onBack={onBack}
                onDelete={onWorkoutDelete}
                title="Update workout"
            />
            {isLoading && <p>spinner</p>}
            {!isLoading && !!workout && (
                <WorkoutEdit originalWorkout={workout} />
            )}
        </div>
    );
}

export default WorkoutUpdate;
