import Exercise from "./exercise.interface";

/** A workout's round. */
interface Round {
    /** Round's repetitions. */
    repeat: number;

    /** Round's break time (s). */
    break: number;

    /** Round's exercises. */
    exercises: Exercise[];
}

export default Round;
