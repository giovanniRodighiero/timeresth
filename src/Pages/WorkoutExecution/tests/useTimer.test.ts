import React from "react";
import { act, renderHook } from "../../../../tools/testUtils";

import buildWorkout from "./mockWorkouts";
import useTimer from "../useTimer";

const mockWorkout = buildWorkout([
    {
        repeat: 1,
        break: 20,
        exercises: [
            { name: "exercise one-one", work: 10, rest: 15, repeat: 1 },
        ],
    },
]);

describe("useTimer", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.restoreAllMocks();
    });

    it("Should not be ready if a workout is not provided", () => {
        const { result } = renderHook(() => useTimer());

        expect(result.current.isReady).toBeFalsy();
        expect(result.current.exerciseName).toBe("default");
    });

    it("Should update the workout when loadWorkout is called", () => {
        const { result } = renderHook(() => useTimer());

        expect(result.current.isReady).toBeFalsy();
        expect(result.current.exerciseName).toBe("default");

        act(() => {
            result.current.loadWorkout(mockWorkout);
        });

        expect(result.current.isReady).toBeTruthy();
        expect(result.current.exercise).toBe(
            mockWorkout.rounds[0].exercises[0]
        );
        expect(result.current.exerciseName).toBe(
            mockWorkout.rounds[0].exercises[0].name
        );
    });

    it("Should be paused by default with all parameters on initial state", () => {
        const { result } = renderHook(() => useTimer(mockWorkout));

        expect(result.current.isReady).toBeTruthy();
        expect(result.current.isRunning).toBeFalsy();
        expect(result.current.value).toBe(5);
        expect(result.current.elapsedTime).toBe(0);
        expect(result.current.phase).toBe(0);
        expect(result.current.exerciseName).toBe("exercise one-one");
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.round).toBe(mockWorkout.rounds[0]);
        expect(result.current.exercise).toBe(
            mockWorkout.rounds[0].exercises[0]
        );

        vi.advanceTimersToNextTimer();

        expect(result.current.isReady).toBeTruthy();
        expect(result.current.isRunning).toBeFalsy();
        expect(result.current.value).toBe(5);
        expect(result.current.elapsedTime).toBe(0);
        expect(result.current.phase).toBe(0);
        expect(result.current.exerciseName).toBe("exercise one-one");
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.round).toBe(mockWorkout.rounds[0]);
        expect(result.current.exercise).toBe(
            mockWorkout.rounds[0].exercises[0]
        );
    });

    it("Should decrease the value while running, but not while paused", () => {
        const { result } = renderHook(() => useTimer(mockWorkout));

        // play timer
        act(() => {
            result.current.play();
        });
        expect(result.current.isReady).toBeTruthy();
        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.value).toBe(5);
        expect(result.current.elapsedTime).toBe(0);
        expect(result.current.phase).toBe(0);
        expect(vi.getTimerCount()).toBe(1);

        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.isReady).toBeTruthy();
        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.value).toBe(4);
        expect(result.current.elapsedTime).toBe(1);
        expect(result.current.phase).toBe(0);
        expect(vi.getTimerCount()).toBe(1);

        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.isReady).toBeTruthy();
        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.value).toBe(3);
        expect(result.current.elapsedTime).toBe(2);
        expect(result.current.phase).toBe(0);
        expect(vi.getTimerCount()).toBe(1);

        // pause timer
        act(() => {
            result.current.pause();
        });
        expect(result.current.isReady).toBeTruthy();
        expect(result.current.isRunning).toBeFalsy();
        expect(result.current.value).toBe(3);
        expect(result.current.elapsedTime).toBe(2);
        expect(result.current.phase).toBe(0);
        expect(vi.getTimerCount()).toBe(0);
    });

    it("Should proceed to the work phase after 5 seconds", () => {
        const { result } = renderHook(() => useTimer(mockWorkout));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.value).toBe(10);
        expect(result.current.elapsedTime).toBe(5);
        expect(result.current.phase).toBe(1);
        expect(result.current.exerciseName).toBe("exercise one-one");
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
    });

    it("Should proceed to the rest phase if exercise has multiple repetitions", () => {
        const wo = buildWorkout([
            {
                repeat: 1,
                break: 20,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 2 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            vi.advanceTimersByTime(10000);
        });
        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.phase).toBe(2);
        expect(result.current.value).toBe(15);
        expect(result.current.elapsedTime).toBe(15);
    });

    it("Should proceed to the work phase for the same exercise after the rest time", () => {
        const wo = buildWorkout([
            {
                repeat: 1,
                break: 20,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 2 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            vi.advanceTimersByTime(10000);
        });
        act(() => {
            vi.advanceTimersByTime(15000);
        });
        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.phase).toBe(1);
        expect(result.current.value).toBe(10);
        expect(result.current.elapsedTime).toBe(30);
        expect(result.current.exerciseRepIndex).toBe(1);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.exerciseName).toBe("exercise one-one");
    });

    it("Should proceed to the done phase after the last rep, of last exercise of the last round rep", () => {
        const wo = buildWorkout([
            {
                repeat: 1,
                break: 20,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 2 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            vi.advanceTimersByTime(10000);
        });
        act(() => {
            vi.advanceTimersByTime(15000);
        });
        act(() => {
            vi.advanceTimersByTime(10000);
        });
        expect(result.current.isRunning).toBeFalsy();
        expect(result.current.phase).toBe(4);
        expect(result.current.elapsedTime).toBe(40);
        expect(result.current.value).toBe(0);
        expect(result.current.exerciseRepIndex).toBe(1);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.exerciseName).toBe("exercise one-one");
        expect(vi.getTimerCount()).toBe(0);
    });

    it("Should proceed to the next exercise", () => {
        const wo = buildWorkout([
            {
                repeat: 1,
                break: 30,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 1 },
                    { name: "exercise one-two", work: 20, rest: 10, repeat: 1 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            vi.advanceTimersByTime(10000);
        });

        expect(result.current.exerciseName).toBe("exercise one-two");

        act(() => {
            vi.advanceTimersByTime(15000);
        });
        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.phase).toBe(1);
        expect(result.current.value).toBe(20);
        expect(result.current.elapsedTime).toBe(30);
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(1);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.exerciseName).toBe("exercise one-two");
    });

    it("Should run the break if the round has more than one repetitions and skip the last ex rest pause", () => {
        const wo = buildWorkout([
            {
                repeat: 2,
                break: 20,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 1 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            // first round, first ex work
            vi.advanceTimersByTime(10000);
        });

        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.phase).toBe(3);
        expect(result.current.value).toBe(20);
        expect(result.current.elapsedTime).toBe(15);
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.exerciseName).toBe("exercise one-one");
    });

    it("Should run the exercise again if the round has multiple repetition", () => {
        const wo = buildWorkout([
            {
                repeat: 2,
                break: 20,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 1 },
                    { name: "exercise one-two", work: 7, rest: 6, repeat: 1 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            // first round, first ex work
            vi.advanceTimersByTime(10000);
        });
        act(() => {
            // first round, first ex rest
            vi.advanceTimersByTime(15000);
        });
        act(() => {
            // first round, second ex work
            vi.advanceTimersByTime(7000);
        });
        expect(result.current.exerciseName).toBe("exercise one-one");
        expect(result.current.phase).toBe(3);
        expect(result.current.value).toBe(20);
        expect(result.current.elapsedTime).toBe(37);

        act(() => {
            // first round, break
            vi.advanceTimersByTime(20000);
        });

        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.phase).toBe(1);
        expect(result.current.value).toBe(10);
        expect(result.current.elapsedTime).toBe(57);
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(1);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.exerciseName).toBe("exercise one-one");
    });

    it("Should run the break if there is another round after last exercise of the current one", () => {
        const wo = buildWorkout([
            {
                repeat: 1,
                break: 20,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 1 },
                ],
            },
            {
                repeat: 1,
                break: 30,
                exercises: [
                    { name: "exercise two-one", work: 12, rest: 18, repeat: 1 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            // first round, first ex work
            vi.advanceTimersByTime(10000);
        });

        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.phase).toBe(3);
        expect(result.current.value).toBe(20);
        expect(result.current.elapsedTime).toBe(15);
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(0);
        expect(result.current.exerciseName).toBe("exercise two-one");
    });

    it("Should go to the next round when there is more than one", () => {
        const wo = buildWorkout([
            {
                repeat: 1,
                break: 20,
                exercises: [
                    { name: "exercise one-one", work: 10, rest: 15, repeat: 1 },
                ],
            },
            {
                repeat: 1,
                break: 30,
                exercises: [
                    { name: "exercise two-one", work: 12, rest: 18, repeat: 1 },
                ],
            },
        ]);
        const { result } = renderHook(() => useTimer(wo));

        act(() => {
            result.current.play();
        });
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        act(() => {
            // first round, first ex work
            vi.advanceTimersByTime(10000);
        });
        act(() => {
            // first round, break
            vi.advanceTimersByTime(20000);
        });

        expect(result.current.isRunning).toBeTruthy();
        expect(result.current.phase).toBe(1);
        expect(result.current.value).toBe(12);
        expect(result.current.elapsedTime).toBe(35);
        expect(result.current.exerciseRepIndex).toBe(0);
        expect(result.current.exerciseIndex).toBe(0);
        expect(result.current.roundRepIndex).toBe(0);
        expect(result.current.roundIndex).toBe(1);
        expect(result.current.exerciseName).toBe("exercise two-one");
    });
});
