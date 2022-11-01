/**
 * Workout edit's page reducer.
 * @param {import("../../types/workout").Workout} draft - The old state in "draft" mode. It can be changed thanks to immer.js.
 *
 * @param {Object} action - Reducer action parameters.
 * @param {string} action.type - Action's type.
 * @param {Object} action.payload - Action's payload.
 * @param {string} action.payload.name - The workout or the exercise name.
 * @param {number} action.payload.round - The index of the round that is being modified.
 * @param {string} action.payload.field - The name of the exercise or round parameter that is being modified.
 * @param {number|string} action.payload.value - The value to assign to the payload.field.
 * @param {number} action.payload.exercise - The index of the exercise that is being modified.
 */
function workoutReducer(draft, action) {
    const { type, payload } = action;
    switch (type) {
        case "UPDATE_NAME":
            draft.name = payload.name;
            break;

        case "ADD_ROUND":
            draft.rounds.push({
                repeat: 1,
                break: 45,
                exercises: [],
            });
            break;

        case "DELETE_ROUND":
            draft.rounds.splice(payload.round, 1);
            break;

        case "UPDATE_ROUND":
            draft.rounds[payload.round][payload.field] = payload.value;
            break;

        case "UPDATE_EXERCISE":
            draft.rounds[payload.round].exercises[payload.exercise][
                payload.field
            ] = payload.value;
            break;

        case "DELETE_EXERCISE":
            draft.rounds[payload.round].exercises.splice(payload.exercise, 1);
            break;

        case "ADD_EXERCISE":
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

export default workoutReducer;
