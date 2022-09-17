import React from "react";
import PropTypes from "prop-types";
import { Edit3 } from "react-feather";

const increaseExCount = (acc, { exercises }) => exercises.length + acc;

/**
 * Component with the workout preview, not editable.
 * Has a link to the execution page and to the edit page.
 */
function WorkoutCard({ workout }) {
    const stats = React.useMemo(() => {
        const exerciseCount = workout.rounds.reduce(increaseExCount, 0);

        let time = workout.rounds.reduce((acc, round) => {
            let exercisesTime = round.exercises.reduce(
                (exAcc, ex) => exAcc + (ex.work + ex.rest) * ex.repeat,
                0
            );
            // rest time is skipped for last exercise of the current round
            const rest =
                round.exercises.length === 0
                    ? 0
                    : round.exercises[round.exercises.length - 1].rest;
            exercisesTime = exercisesTime - rest;
            return acc + (exercisesTime + round.break) * round.repeat;
        }, 0);

        // breaktime is skipped for the last round of the workout
        time =
            time -
            (workout.rounds.length > 0
                ? workout.rounds[workout.rounds.length - 1].break
                : 0);
        time = new Date(time * 1000).toISOString().substring(14, 19);
        return { exerciseCount, time };
    }, [workout.rounds]);

    return (
        <article className="flex h-32 max-w-md cursor-pointer flex-col justify-around rounded-md bg-main drop-shadow-md">
            <div className="relative border-b-2 border-white py-1">
                <a href={`/workouts/${workout.id}`}>
                    <h2 className="text-center font-serif text-2xl text-dark">
                        {workout.name}
                    </h2>
                </a>
                <a
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-main text-dark"
                    href={`/workouts/${workout.id}/edit`}
                    aria-label="Edit workout"
                >
                    <Edit3 size={26} />
                </a>
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

WorkoutCard.propTypes = {
    /**
     * single workout program
     */
    workout: PropTypes.shape({
        /**
         * Id of the workout
         */
        id: PropTypes.string.isRequired,

        /**
         * The name of the workout
         */
        name: PropTypes.string.isRequired,

        /**
         * The rounds that compose the workout.
         * Each round has
         * - a set of exercises;
         * - a number of times the set has to be executed;
         * - a break time between every round execution.
         */
        rounds: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * Duration of the rest time after an execution of the round, in seconds
                 */
                break: PropTypes.number.isRequired,

                /**
                 * Home many times this round has to be executed
                 */
                repeat: PropTypes.number.isRequired,

                /**
                 * The set of exercises
                 */
                exercises: PropTypes.arrayOf(
                    PropTypes.shape({
                        /**
                         * Name of the exercise
                         */
                        name: PropTypes.string.isRequired,

                        /**
                         * Duration of the exercise, in seconds
                         */
                        work: PropTypes.number.isRequired,

                        /**
                         * Duration of the rest time after the exercise, in seconds
                         */
                        rest: PropTypes.number.isRequired,

                        /**
                         * Home many times the exercise has to be executed
                         */
                        repeat: PropTypes.number.isRequired,
                    })
                ).isRequired,
            })
        ).isRequired,
    }).isRequired,
};

function WorkoutCardInfo({ label, value }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-evenly font-sans text-white">
            <span className="text-2xl font-medium">{value}</span>
            <span className="text-xl font-light">{label}</span>
        </div>
    );
}

WorkoutCardInfo.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default WorkoutCard;
