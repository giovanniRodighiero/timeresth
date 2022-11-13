import Exercise from "../types/exercise.interface";
import Workout from "../types/workout.interface";

function increaseExCount(
    accumulator: number,
    { exercises }: { exercises: Exercise[] }
): number {
    return exercises.length + accumulator;
}

/**
 * Get the total number of exercises inside a workout.
 */
function calcWorkoutExercises(workout: Workout): number {
    return workout.rounds.reduce(increaseExCount, 0);
}

export default calcWorkoutExercises;
