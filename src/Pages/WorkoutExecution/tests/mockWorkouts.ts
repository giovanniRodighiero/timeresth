import Round from "../../../types/round.interface";
import Workout from "../../../types/workout.interface";

function buildWorkout(rounds: Round[]): Workout {
    return {
        id: 123,
        name: "workout mock",
        rounds,
    };
}

export default buildWorkout;
