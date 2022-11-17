import workoutReducer from "../reducer";
import { ACTIONS } from "../reducer";

describe("workoutReducer", () => {
    it("Should do nothing in case of a non existing action type", () => {
        const draft = {};
        workoutReducer(draft, { type: "aaa", payload: {} });
        expect(draft).toEqual({});
    });

    it("Should update the workout name for the action: UPDATE_NAME", () => {
        const draft = {
            name: "workout one",
            rounds: [],
        };
        workoutReducer(draft, {
            type: ACTIONS.UPDATE_NAME,
            payload: { name: "workout two" },
        });
        expect(draft.rounds).toHaveLength(0);
        expect(draft.name).toBe("workout two");
    });

    it("Should add a round to the workout for the action: ADD_ROUND", () => {
        const draft = {
            rounds: [],
        };
        workoutReducer(draft, { type: ACTIONS.ADD_ROUND, payload: {} });
        expect(draft.rounds).toHaveLength(1);
        expect(draft.rounds[0]).toEqual({
            repeat: 1,
            break: 45,
            exercises: [],
        });
    });

    it("Should delete a round of the workout for the action: DELETE_ROUND", () => {
        const draft = {
            rounds: [
                { repeat: 1, break: 1, exercises: [] },
                { repeat: 2, break: 2, exercises: [] },
            ],
        };
        workoutReducer(draft, {
            type: ACTIONS.DELETE_ROUND,
            payload: { round: 1 },
        });
        expect(draft.rounds).toHaveLength(1);
        expect(draft.rounds[0]).toEqual({
            repeat: 1,
            break: 1,
            exercises: [],
        });
    });

    it("Should update a round of the workout for the action: UPDATE_ROUND", () => {
        const draft = {
            rounds: [
                { repeat: 1, break: 1, exercises: [] },
                { repeat: 2, break: 2, exercises: [] },
            ],
        };
        workoutReducer(draft, {
            type: ACTIONS.UPDATE_ROUND,
            payload: { round: 1, field: "repeat", value: 5 },
        });
        expect(draft.rounds).toHaveLength(2);
        expect(draft.rounds[0]).toEqual({
            repeat: 1,
            break: 1,
            exercises: [],
        });
        expect(draft.rounds[1]).toEqual({
            repeat: 5,
            break: 2,
            exercises: [],
        });

        workoutReducer(draft, {
            type: ACTIONS.UPDATE_ROUND,
            payload: { round: 1, field: "break", value: 10 },
        });
        expect(draft.rounds).toHaveLength(2);
        expect(draft.rounds[0]).toEqual({
            repeat: 1,
            break: 1,
            exercises: [],
        });
        expect(draft.rounds[1]).toEqual({
            repeat: 5,
            break: 10,
            exercises: [],
        });
    });

    it("Should update an exercise inside a round of the workout for the action: UPDATE_EXERCISE", () => {
        const draft = {
            rounds: [
                {
                    repeat: 1,
                    break: 1,
                    exercises: [
                        { name: "ex one", work: 11, rest: 11, repeat: 11 },
                        { name: "ex two", work: 22, rest: 22, repeat: 22 },
                    ],
                },
                {
                    repeat: 2,
                    break: 2,
                    exercises: [
                        { name: "ex three", work: 33, rest: 33, repeat: 33 },
                    ],
                },
            ],
        };
        workoutReducer(draft, {
            type: ACTIONS.UPDATE_EXERCISE,
            payload: { round: 0, exercise: 1, field: "work", value: 50 },
        });
        expect(draft.rounds).toHaveLength(2);
        expect(draft.rounds[0].repeat).toBe(1);
        expect(draft.rounds[0].break).toBe(1);
        expect(draft.rounds[0].exercises).toHaveLength(2);
        expect(draft.rounds[0].exercises[0]).toEqual({
            name: "ex one",
            work: 11,
            rest: 11,
            repeat: 11,
        });
        expect(draft.rounds[0].exercises[1]).toEqual({
            name: "ex two",
            work: 50,
            rest: 22,
            repeat: 22,
        });

        expect(draft.rounds[1].repeat).toBe(2);
        expect(draft.rounds[1].break).toBe(2);
        expect(draft.rounds[1].exercises).toHaveLength(1);
        expect(draft.rounds[1].exercises[0]).toEqual({
            name: "ex three",
            work: 33,
            rest: 33,
            repeat: 33,
        });
    });

    it("Should delete an exercise inside a round of the workout for the action: DELETE_EXERCISE", () => {
        const draft = {
            rounds: [
                {
                    repeat: 1,
                    break: 1,
                    exercises: [
                        { name: "ex one", work: 11, rest: 11, repeat: 11 },
                        { name: "ex two", work: 22, rest: 22, repeat: 22 },
                    ],
                },
                {
                    repeat: 2,
                    break: 2,
                    exercises: [
                        { name: "ex three", work: 33, rest: 33, repeat: 33 },
                    ],
                },
            ],
        };
        workoutReducer(draft, {
            type: ACTIONS.DELETE_EXERCISE,
            payload: { round: 0, exercise: 0 },
        });
        expect(draft.rounds).toHaveLength(2);
        expect(draft.rounds[0].repeat).toBe(1);
        expect(draft.rounds[0].break).toBe(1);
        expect(draft.rounds[0].exercises).toHaveLength(1);
        expect(draft.rounds[0].exercises[0]).toEqual({
            name: "ex two",
            work: 22,
            rest: 22,
            repeat: 22,
        });

        expect(draft.rounds[1].repeat).toBe(2);
        expect(draft.rounds[1].break).toBe(2);
        expect(draft.rounds[1].exercises).toHaveLength(1);
        expect(draft.rounds[1].exercises[0]).toEqual({
            name: "ex three",
            work: 33,
            rest: 33,
            repeat: 33,
        });
    });

    it("Should add an exercise inside a round of the workout for the action: ADD_EXERCISE", () => {
        const draft = {
            rounds: [
                {
                    repeat: 1,
                    break: 1,
                    exercises: [
                        { name: "ex one", work: 11, rest: 11, repeat: 11 },
                        { name: "ex two", work: 22, rest: 22, repeat: 22 },
                    ],
                },
                {
                    repeat: 2,
                    break: 2,
                    exercises: [
                        { name: "ex three", work: 33, rest: 33, repeat: 33 },
                    ],
                },
            ],
        };
        workoutReducer(draft, {
            type: ACTIONS.ADD_EXERCISE,
            payload: { round: 1 },
        });
        expect(draft.rounds).toHaveLength(2);
        expect(draft.rounds[0].repeat).toBe(1);
        expect(draft.rounds[0].break).toBe(1);
        expect(draft.rounds[0].exercises).toHaveLength(2);
        expect(draft.rounds[0].exercises[0]).toEqual({
            name: "ex one",
            work: 11,
            rest: 11,
            repeat: 11,
        });
        expect(draft.rounds[0].exercises[1]).toEqual({
            name: "ex two",
            work: 22,
            rest: 22,
            repeat: 22,
        });

        expect(draft.rounds[1].repeat).toBe(2);
        expect(draft.rounds[1].break).toBe(2);
        expect(draft.rounds[1].exercises).toHaveLength(2);
        expect(draft.rounds[1].exercises[0]).toEqual({
            name: "ex three",
            work: 33,
            rest: 33,
            repeat: 33,
        });
        expect(draft.rounds[1].exercises[1]).toEqual({
            name: "",
            work: 20,
            rest: 20,
            repeat: 1,
        });
    });
});
