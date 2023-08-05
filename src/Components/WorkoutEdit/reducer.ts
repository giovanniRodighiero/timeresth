import Exercise from "../../types/exercise.interface";
import Round from "../../types/round.interface";
import Workout, { EditableWorkout } from "../../types/workout.interface";

export enum ACTIONS {
    INIT = "INIT",
    UPDATE_NAME = "UPDATE_NAME",
    ADD_ROUND = "ADD_ROUND",
    DELETE_ROUND = "DELETE_ROUND",
    UPDATE_ROUND = "UPDATE_ROUND",
    UPDATE_EXERCISE_NUM = "UPDATE_EXERCISE_NUM",
    UPDATE_EXERCISE_STR = "UPDATE_EXERCISE_STR",
    DELETE_EXERCISE = "DELETE_EXERCISE",
    ADD_EXERCISE = "ADD_EXERCISE",
}

type InitWorkoutAction = {
    type: ACTIONS.INIT;
    payload: Workout;
};

type UpdateNameAction = {
    type: ACTIONS.UPDATE_NAME;
    payload: {
        name: string;
    };
};

type AddRoundAction = {
    type: ACTIONS.ADD_ROUND;
    payload?: {};
};

type DeleteRoundAction = {
    type: ACTIONS.DELETE_ROUND;
    payload: {
        round: number;
    };
};

type UpdateRoundAction = {
    type: ACTIONS.UPDATE_ROUND;
    payload: {
        round: number;
        field: Exclude<keyof Round, "exercises">;
        value: number;
    };
};

type UpdateExerciseNumAction = {
    type: ACTIONS.UPDATE_EXERCISE_NUM;
    payload: {
        round: number;
        exercise: number;
        field: Exclude<keyof Exercise, "name">;
        value: number | "";
    };
};

type UpdateExerciseStrAction = {
    type: ACTIONS.UPDATE_EXERCISE_STR;
    payload: {
        round: number;
        exercise: number;
        field: "name";
        value: string;
    };
};

type DeleteExerciseAction = {
    type: ACTIONS.DELETE_EXERCISE;
    payload: {
        round: number;
        exercise: number;
    };
};

type AddExerciseAction = {
    type: ACTIONS.ADD_EXERCISE;
    payload: {
        round: number;
    };
};

export type Action =
    | InitWorkoutAction
    | UpdateNameAction
    | AddRoundAction
    | DeleteRoundAction
    | UpdateRoundAction
    | UpdateExerciseNumAction
    | UpdateExerciseStrAction
    | DeleteExerciseAction
    | AddExerciseAction;

function workoutEditReducer(
    draft: { hasChanges: boolean } & EditableWorkout,
    action: Action
): void {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.INIT:
            draft.hasChanges = false;
            draft.name = payload.name;
            draft.rounds = payload.rounds;
            break;

        case ACTIONS.UPDATE_NAME:
            draft.hasChanges = true;
            draft.name = payload.name;
            break;

        case ACTIONS.ADD_ROUND:
            draft.hasChanges = true;
            draft.rounds.push({
                repeat: 1,
                break: 45,
                exercises: [],
            });
            break;

        case ACTIONS.DELETE_ROUND:
            draft.hasChanges = true;
            draft.rounds.splice(payload.round, 1);
            break;

        case ACTIONS.UPDATE_ROUND:
            draft.hasChanges = true;
            draft.rounds[payload.round][payload.field] = payload.value;
            break;

        case ACTIONS.UPDATE_EXERCISE_STR:
            draft.hasChanges = true;
            draft.rounds[payload.round].exercises[payload.exercise][
                payload.field
            ] = payload.value;
            break;

        case ACTIONS.UPDATE_EXERCISE_NUM:
            draft.hasChanges = true;
            draft.rounds[payload.round].exercises[payload.exercise][
                payload.field
            ] = payload.value;
            break;

        case ACTIONS.DELETE_EXERCISE:
            draft.hasChanges = true;
            draft.rounds[payload.round].exercises.splice(payload.exercise, 1);
            break;

        case ACTIONS.ADD_EXERCISE:
            draft.hasChanges = true;
            draft.rounds[payload.round].exercises.push({
                name: "",
                work: 20,
                rest: 20,
                repeat: 1,
            });

        default:
            break;
    }
}

export default workoutEditReducer;
