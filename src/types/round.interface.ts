import Exercise, { EditableExercise } from "./exercise.interface";

/** A workout's round. */
interface Round {
    /** Round's repetitions. */
    repeat: number;

    /** Round's break time (s). */
    break: number;

    /** Round's exercises. */
    exercises: Exercise[];
}

/** A workout's round. */
export interface EditableRound extends Omit<Round, "exercises"> {
    /** Round's exercises. */
    exercises: EditableExercise[];
}

export default Round;
