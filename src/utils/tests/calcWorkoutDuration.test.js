import calcWorkoutDuration from "../calcWorkoutDuration";

const fakeRoundOne = {
    exercises: [
        {
            name: "squats",
            work: 20,
            rest: 10,
            repeat: 3,
        }, // 30 * 3 = 90
        {
            name: "push ups",
            work: 25,
            rest: 15,
            repeat: 1,
        }, // 40
        {
            name: "resistance band rows",
            work: 25,
            rest: 15,
            repeat: 1,
        }, // 40 - 15 = 25
    ], // 90 + 40 + 25 = 155 => (155 + 45) * 3 => 600 - 45 = 555 09:15
    repeat: 3,
    break: 45,
};

const fakeRoundTwo = {
    exercises: [
        {
            name: "knee to elbow",
            work: 30,
            rest: 10,
            repeat: 1,
        }, // 40
        {
            name: "Plank",
            work: 40,
            rest: 10,
            repeat: 1,
        }, // 40
    ], // 40 + 40 = 80 => (80 + 30) * 2 = 220 - 30 = 190 03:10
    repeat: 2,
    break: 30,
};

describe("utils: calcWorkoutDuration", () => {
    it("Should return 00:00 for a workout with no rounds", () => {
        const result = calcWorkoutDuration({ rounds: [] });

        expect(result.getTime()).toBe(0);
    });

    it("Should return 00:00 for a workout no exercises and no break time", () => {
        const result = calcWorkoutDuration({
            rounds: [
                { exercises: [], break: 0, repeat: 1 },
                { exercises: [], break: 40, repeat: 1 },
            ],
        });

        expect(result.getTime()).toBe(0);
    });

    it("Should return 00:40 for a workout no exercises but break time", () => {
        const result = calcWorkoutDuration({
            rounds: [
                { exercises: [], break: 20, repeat: 2 },
                { exercises: [], break: 40, repeat: 1 },
            ],
        });

        expect(result.getTime()).toBe(40000);
    });

    it("Should return 09:15 for a complete workout (template one)", () => {
        const result = calcWorkoutDuration({
            rounds: [fakeRoundOne],
        });

        expect(result.getMinutes()).toBe(9);
        expect(result.getSeconds()).toBe(15);
    });

    it("Should return 03:10 for a complete workout (template two)", () => {
        const result = calcWorkoutDuration({
            rounds: [fakeRoundTwo],
        });

        expect(result.getMinutes()).toBe(3);
        expect(result.getSeconds()).toBe(10);
    });

    it("Should return 13:25 for a complete workout (template one + two)", () => {
        const result = calcWorkoutDuration({
            rounds: [fakeRoundOne, fakeRoundTwo],
        });

        expect(result.getMinutes()).toBe(13);
        expect(result.getSeconds()).toBe(10);
    });
});
