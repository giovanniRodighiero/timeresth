import React from "react";

import Workout from "../../types/workout.interface";

enum PHASES {
    GET_READY,
    WORK,
    REST,
    BREAK,
    DONE,
}
const GET_READY_DURATION = 5;

interface useTimerInterface {
    /** Is the timer running or not */
    isRunning: boolean;

    /** The current seconds remaining */
    value: number;

    /** The current phase of the workout */
    phase: PHASES;

    /** The current (or next up) exercise name */
    exercise: string;

    /** The current exercise repetition */
    exerciseRepIndex: number;

    /** The current exercise (n/m) */
    exerciseIndex: number;

    /** The current round repetition */
    roundRepIndex: number;

    /** The current round (n/m) */
    roundIndex: number;

    /** Start or resume the timer */
    play: () => void;

    /** Pause the timer */
    pause: () => void;
}

function useTimer(workout: Workout): useTimerInterface {
    const intervalRef = React.useRef<NodeJS.Timer>();
    const [isRunning, setIsRunning] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<number>(GET_READY_DURATION);
    const [phase, setPhase] = React.useState<number>(PHASES.GET_READY);

    const [roundIndex, setRoundIndex] = React.useState<number>(0);
    const [roundRepIndex, setRoundRepIndex] = React.useState<number>(0);

    const [exerciseIndex, setExerciseIndex] = React.useState<number>(0);
    const [exerciseRepIndex, setExerciseRepIndex] = React.useState<number>(0);

    const round = workout.rounds[roundIndex];
    const exercise = round.exercises[exerciseIndex];
    const [exerciseName, setExerciseName] = React.useState<string>(
        exercise.name
    );

    const nextPhase = () => {
        switch (phase) {
            case PHASES.GET_READY:
                setPhase(PHASES.WORK);
                setValue(exercise.work);
                break;

            case PHASES.WORK:
                // THERE ARE MORE EXERCISES / REPS
                if (
                    exerciseRepIndex < exercise.repeat - 1 ||
                    exerciseIndex < round.exercises.length - 1
                ) {
                    setPhase(PHASES.REST);
                    setValue(exercise.rest);
                    if (exerciseRepIndex === exercise.repeat - 1)
                        setExerciseName(
                            round.exercises[exerciseIndex + 1].name
                        );
                    break;
                }

                // THE ROUND HAS MORE REPS
                if (roundRepIndex < round.repeat - 1) {
                    setPhase(PHASES.BREAK);
                    setValue(round.break);
                    setExerciseName(round.exercises[0].name);
                    break;
                }

                // THE WORKOUT HAS MORE ROUNDS
                if (roundIndex < workout.rounds.length - 1) {
                    setPhase(PHASES.BREAK);
                    setValue(round.break);
                    setExerciseName(
                        workout.rounds[roundIndex + 1].exercises[0].name
                    );
                    break;
                }

                // WORKOUT DONE
                setPhase(PHASES.DONE);
                setIsRunning(false);
                break;

            case PHASES.REST:
                // EXERCISE HAS ANOTHER REP
                if (exerciseRepIndex < exercise.repeat - 1) {
                    setPhase(PHASES.WORK);
                    setValue(exercise.work);
                    setExerciseRepIndex(prev => prev + 1);
                    break;
                }

                // ROUND HAS ANOTHER EXERCISE
                setPhase(PHASES.WORK);
                setExerciseRepIndex(0);
                setExerciseIndex(prev => {
                    setValue(round.exercises[prev + 1].work);
                    return prev + 1;
                });
                break;

            case PHASES.BREAK:
                // ROUND HAS MORE REPS
                if (roundRepIndex < round.repeat - 1) {
                    setPhase(PHASES.WORK);
                    setExerciseRepIndex(0);
                    setExerciseIndex(0);
                    setValue(round.exercises[0].work);
                    setRoundRepIndex(prev => prev + 1);
                    break;
                }

                // THERE IS ANOTHER ROUND
                setPhase(PHASES.WORK);
                setExerciseRepIndex(0);
                setExerciseIndex(0);
                setRoundRepIndex(0);
                setRoundIndex(prev => {
                    setValue(workout.rounds[prev + 1].exercises[0].work);
                    return prev + 1;
                });
                break;

            /* c8 ignore next 2 */
            default:
                break;
        }
    };

    const cleanupTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const play = () => setIsRunning(true);
    const pause = () => setIsRunning(false);

    React.useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setValue(prev => prev - 1);
            }, 1000);
        }

        return cleanupTimer;
    }, [isRunning]);

    React.useEffect(() => {
        if (value === 0) nextPhase();
    }, [value]);

    return {
        isRunning,
        value,
        phase,
        exercise: exerciseName,
        exerciseIndex,
        exerciseRepIndex,
        roundIndex,
        roundRepIndex,
        play,
        pause,
    };
}

export default useTimer;
