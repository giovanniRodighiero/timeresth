import Workout from "../../types/workout.interface";

export enum ACTIONS {
    UPDATE_NAME = "UPDATE_NAME",
    ADD_ROUND = "ADD_ROUND",
    DELETE_ROUND = "DELETE_ROUND",
    UPDATE_ROUND = "UPDATE_ROUND",
    UPDATE_EXERCISE = "UPDATE_EXERCISE",
    DELETE_EXERCISE = "DELETE_EXERCISE",
    ADD_EXERCISE = "ADD_EXERCISE",
}

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
        field: string;
        value: number;
    };
};

type UpdateExerciseAction = {
    type: ACTIONS.UPDATE_EXERCISE;
    payload: {
        round: number;
        exercise: number;
        field: string;
        value: number;
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

type Action =
    | UpdateNameAction
    | AddRoundAction
    | DeleteRoundAction
    | UpdateRoundAction
    | UpdateExerciseAction
    | DeleteExerciseAction
    | AddExerciseAction;

function workoutEditReducer(draft: Workout, action: Action): void {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.UPDATE_NAME:
            draft.name = payload.name;
            break;

        case ACTIONS.ADD_ROUND:
            draft.rounds.push({
                repeat: 1,
                break: 45,
                exercises: [],
            });
            break;

        case ACTIONS.DELETE_ROUND:
            draft.rounds.splice(payload.round, 1);
            break;

        case ACTIONS.UPDATE_ROUND:
            draft.rounds[payload.round][payload.field] = payload.value;
            break;

        case ACTIONS.UPDATE_EXERCISE:
            draft.rounds[payload.round].exercises[payload.exercise][
                payload.field
            ] = payload.value;
            break;

        case ACTIONS.DELETE_EXERCISE:
            draft.rounds[payload.round].exercises.splice(payload.exercise, 1);
            break;

        case ACTIONS.ADD_EXERCISE:
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
