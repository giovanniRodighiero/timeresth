/**
 * A workout's exercise.
 */
interface Exercise {
    /** Exercise's name. */
    name: string;

    /** Exercise's work time (s). */
    work: number;

    /** Exercise's rest time (s). */
    rest: number;

    /** Exercise's repetitions. */
    repeat: number;
}

export default Exercise;
