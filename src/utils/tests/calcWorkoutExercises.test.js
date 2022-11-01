import calcWorkoutExercises from "../calcWorkoutExercises";

describe("utils: calcWorkoutExercises", () => {
    it("Should return zero if the workout has zero rounds", () => {
        expect(calcWorkoutExercises({ rounds: [] })).toBe(0);
    });

    it("Should return zero if all the rounds have zero exercises", () => {
        expect(
            calcWorkoutExercises({
                rounds: [{ exercises: [] }, { exercises: [] }],
            })
        ).toBe(0);
    });

    it("Should return 3 if the workout has 3 exercises", () => {
        expect(
            calcWorkoutExercises({
                rounds: [
                    { exercises: [{ name: "aaa" }, { name: "bbb" }] },
                    { exercises: [{ name: "ccc" }] },
                ],
            })
        ).toBe(3);
    });
});
