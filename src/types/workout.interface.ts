import Round from "./round.interface";

/** A complete workout. */
interface Workout {
    /** Workout's id. */
    id: number;

    /** Workout's name. */
    name: string;

    /** Workout's rounds. */
    rounds: Round[];
}

export default Workout;
