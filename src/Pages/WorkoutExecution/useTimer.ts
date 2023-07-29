import React from "react";

import Workout from "../../types/workout.interface";
import Round from "../../types/round.interface";
import Exercise from "../../types/exercise.interface";

export enum PHASES {
    GET_READY,
    WORK,
    REST,
    BREAK,
    DONE,
}
const GET_READY_DURATION = 5;

interface useTimerInterface {
    /** Is the timer ready to be used (workout is provided or not) */
    isReady: boolean;

    /** Is the timer running or not */
    isRunning: boolean;

    /** The current seconds remaining */
    value: number;

    /** The current seconds remaining as percentage */
    percentage: number;

    /** Total seconds elapsed from the start of the timer */
    elapsedTime: number;

    /** The current phase of the workout */
    phase: PHASES;

    /** The loaded workout */
    workout: Workout;

    /** The current round of the workout */
    round: Round;

    /** The current exercise of the workout */
    exercise: Exercise;

    /** The current (or next up) exercise name */
    exerciseName: string;

    /** The current exercise repetition */
    exerciseRepIndex: number;

    /** The current exercise (n/m) */
    exerciseIndex: number;

    /** The current round repetition */
    roundRepIndex: number;

    /** The current round (n/m) */
    roundIndex: number;

    /** Start or resume the timer */
    loadWorkout: (newWorkout: Workout) => void;

    /** Start or resume the timer */
    play: () => void;

    /** Pause the timer */
    pause: () => void;
}

function useTimer(
    initialWorkout: Workout = {
        id: 0,
        name: "default",
        rounds: [
            {
                repeat: 1,
                break: 20,
                exercises: [{ name: "default", work: 10, rest: 15, repeat: 1 }],
            },
        ],
    }
): useTimerInterface {
    const intervalRef = React.useRef<NodeJS.Timer>();
    const [workout, setWorkout] = React.useState<Workout>(initialWorkout);
    const [isRunning, setIsRunning] = React.useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = React.useState<number>(0);
    const [startingValue, setStartingValue] =
        React.useState<number>(GET_READY_DURATION);
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
    const percentage = parseFloat(((value / startingValue) * 100).toFixed(2));

    const resetTimer = () => {
        setIsRunning(false);
        setValue(GET_READY_DURATION);
        setStartingValue(GET_READY_DURATION);
        setElapsedTime(0);
        setPhase(PHASES.GET_READY);
        setRoundIndex(0);
        setRoundRepIndex(0);
        setExerciseIndex(0);
        setExerciseRepIndex(0);
    };

    const nextPhase = () => {
        switch (phase) {
            case PHASES.GET_READY:
                setPhase(PHASES.WORK);
                setValue(exercise.work);
                setStartingValue(exercise.work);
                break;

            case PHASES.WORK:
                // THERE ARE MORE EXERCISES / REPS
                if (
                    exerciseRepIndex < exercise.repeat - 1 ||
                    exerciseIndex < round.exercises.length - 1
                ) {
                    setPhase(PHASES.REST);
                    setValue(exercise.rest);
                    setStartingValue(exercise.rest);
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
                    setStartingValue(round.break);
                    setExerciseName(round.exercises[0].name);
                    break;
                }

                // THE WORKOUT HAS MORE ROUNDS
                if (roundIndex < workout.rounds.length - 1) {
                    setPhase(PHASES.BREAK);
                    setValue(round.break);
                    setStartingValue(round.break);
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
                    setStartingValue(exercise.work);
                    setExerciseRepIndex(prev => prev + 1);
                    break;
                }

                // ROUND HAS ANOTHER EXERCISE
                setPhase(PHASES.WORK);
                setExerciseRepIndex(0);
                setExerciseIndex(prev => {
                    setValue(round.exercises[prev + 1].work);
                    setStartingValue(round.exercises[prev + 1].work);
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
                    setStartingValue(round.exercises[0].work);
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
                    setStartingValue(
                        workout.rounds[prev + 1].exercises[0].work
                    );
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

    const loadWorkout = (newWorkout: Workout) => {
        resetTimer();
        setWorkout(newWorkout);
        setExerciseName(newWorkout.rounds[0].exercises[0].name);
    };
    const play = () => setIsRunning(true);
    const pause = () => setIsRunning(false);

    React.useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setValue(prev => prev - 1);
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }

        return cleanupTimer;
    }, [isRunning]);

    React.useEffect(() => {
        if (value === 0) nextPhase();
    }, [value]);

    return {
        isReady: workout.id !== 0 && workout.name !== "default",
        isRunning,
        value,
        percentage,
        elapsedTime,
        phase,
        workout,
        round,
        exercise,
        exerciseName,
        exerciseIndex,
        exerciseRepIndex,
        roundIndex,
        roundRepIndex,
        loadWorkout,
        play,
        pause,
    };
}

export default useTimer;
