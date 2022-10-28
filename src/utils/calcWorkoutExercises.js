/**
 * Reduce function
 * @param {number} accumulator
 * @param {Object} round
 * @param {Array} round.exercises
 * @returns {number}
 */
function increaseExCount(accumulator, { exercises }) {
    return exercises.length + accumulator;
}

/**
 * Get the total number of exercises inside a workout.
 * @param {import("../types/workout").Workout} workout
 * @returns {number}
 */
function calcWorkoutExercises(workout) {
    return workout.rounds.reduce(increaseExCount, 0);
}

export default calcWorkoutExercises;
