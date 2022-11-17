import Workout from "../types/workout.interface";

/** Get the total workout duration, including breaks and rest time. */
function calcWorkoutDuration(workout: Workout): Date {
    let totalSeconds = workout.rounds.reduce((acc, round) => {
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
    if (workout.rounds.length > 0)
        totalSeconds =
            totalSeconds - workout.rounds[workout.rounds.length - 1].break;

    const time = new Date(totalSeconds * 1000);
    return time;
}

export default calcWorkoutDuration;
