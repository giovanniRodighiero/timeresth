/**
 * Get the total workout duration, including breaks and rest time.
 * @param {import("../types/workout").Workout} workout
 * @returns {Date} Total workout duration
 */
function calcWorkoutDuration(workout) {
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
    if (workout.rounds.length > 0)
        time = time - workout.rounds[workout.rounds.length - 1].break;

    time = new Date(time * 1000);
    return time;
}

export default calcWorkoutDuration;
