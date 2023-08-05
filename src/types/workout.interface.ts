import Round, { EditableRound } from "./round.interface";

/** A complete workout. */
interface Workout {
    /** Workout's id. */
    id: number;

    /** Workout's name. */
    name: string;

    /** Workout's rounds. */
    rounds: Round[];
}

/** A complete workout. */
export interface EditableWorkout extends Omit<Workout, 'rounds'> {
    /** Workout's rounds. */
    rounds: EditableRound[];
}

export default Workout;
