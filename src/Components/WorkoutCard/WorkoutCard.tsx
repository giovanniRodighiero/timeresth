import React from "react";
import { Link } from "react-router-dom";
import { Edit3 } from "react-feather";

import calcWorkoutDuration from "../../utils/calcWorkoutDuration";
import calcWorkoutExercises from "../../utils/calcWorkoutExercises";
import Workout from "../../types/workout.interface";

interface WorkoutCardProps {
    workout: Workout;
}

/**
 * Component with the workout preview, not editable.
 * Has a link to the execution page and to the edit page.
 */
function WorkoutCard({ workout }: WorkoutCardProps) {
    const linkRef = React.useRef<HTMLAnchorElement>(null);

    const stats = React.useMemo(() => {
        const exerciseCount = calcWorkoutExercises(workout);
        const time = calcWorkoutDuration(workout)
            .toISOString()
            .substring(14, 19);
        return { exerciseCount, time };
    }, [workout.rounds]);

    const onArticleClick = () => linkRef.current?.click();

    return (
        <article
            className="mx-auto flex h-32 max-w-md cursor-pointer flex-col justify-around rounded-md bg-main drop-shadow-md"
            role="button"
            onClick={onArticleClick}
        >
            <div className="relative border-b-2 border-white py-1">
                <Link to={`/workouts/${workout.id}`} ref={linkRef}>
                    <h2 className="text-center font-serif text-2xl text-dark">
                        {workout.name}
                    </h2>
                </Link>
                <Link
                    onClick={e => e.stopPropagation()}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-main text-dark"
                    to={`/workouts/${workout.id}/edit`}
                    aria-label="Edit workout"
                >
                    <Edit3 size={26} />
                </Link>
            </div>
            <div className="flex justify-evenly py-1">
                <WorkoutCardInfo label="minutes" value={stats.time} />
                <WorkoutCardInfo label="rounds" value={workout.rounds.length} />
                <WorkoutCardInfo
                    label="exercises"
                    value={stats.exerciseCount}
                />
            </div>
        </article>
    );
}

interface WorkoutCardInfoProps {
    label: string;
    value: string | number;
}

function WorkoutCardInfo({ label, value }: WorkoutCardInfoProps) {
    return (
        <div className="flex flex-1 flex-col items-center justify-evenly font-sans text-white">
            <span className="text-2xl font-medium">{value}</span>
            <span className="text-xl font-light">{label}</span>
        </div>
    );
}

export default WorkoutCard;
