import React from "react";
import { render } from "../../../tools/test-utils";

import WorkoutCard from "./WorkoutCard";

const fakeWorkout = {
    id: "abc",
    name: "my workout",
    rounds: [],
};

const fakeRoundZero = {
    exercises: [],
    repeat: 1,
    break: 45,
};

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

describe("<WorkoutCard />", () => {
    it("Should have the correct path for both links", () => {
        const { queryAllByRole } = render(
            <WorkoutCard workout={fakeWorkout} />
        );

        expect(queryAllByRole("link")).toHaveLength(2);
        expect(queryAllByRole("link")[0]).toHaveAttribute(
            "href",
            "/workouts/abc"
        );
        expect(queryAllByRole("link")[1]).toHaveAttribute(
            "href",
            "/workouts/abc/edit"
        );
    });

    it("Should have the aria-label in the edit link", () => {
        const { getByLabelText } = render(
            <WorkoutCard workout={fakeWorkout} />
        );

        expect(getByLabelText("Edit workout")).toBeInTheDocument();
    });

    it("Should render stats equal to zero when the workout has no rounds", () => {
        const { getByText, getAllByText } = render(
            <WorkoutCard workout={fakeWorkout} />
        );

        expect(getByText("minutes")).toBeInTheDocument();
        expect(getByText("rounds")).toBeInTheDocument();
        expect(getByText("exercises")).toBeInTheDocument();
        expect(getAllByText("0")).toHaveLength(2);
        expect(getByText("00:00")).toBeInTheDocument();
    });

    it("Should render stats equal to zero when the workout has rounds, but no exercises", () => {
        const { getByText, getAllByText } = render(
            <WorkoutCard
                workout={{ ...fakeWorkout, rounds: [fakeRoundZero] }}
            />
        );

        expect(getByText("minutes")).toBeInTheDocument();
        expect(getByText("rounds")).toBeInTheDocument();
        expect(getByText("exercises")).toBeInTheDocument();
        expect(getByText("0")).toBeInTheDocument();
        expect(getByText("1")).toBeInTheDocument();
        expect(getByText("00:00")).toBeInTheDocument();
    });

    it("Should render stats with the correct value when there is one round", () => {
        const { getByText } = render(
            <WorkoutCard workout={{ ...fakeWorkout, rounds: [fakeRoundOne] }} />
        );

        expect(getByText("minutes")).toBeInTheDocument();
        expect(getByText("rounds")).toBeInTheDocument();
        expect(getByText("exercises")).toBeTruthy();
        expect(getByText("3")).toBeInTheDocument();
        expect(getByText("1")).toBeInTheDocument();
        expect(getByText("09:15")).toBeInTheDocument();
    });

    it("Should render stats with the correct value when there is two rounds", () => {
        const { getByText } = render(
            <WorkoutCard
                workout={{
                    ...fakeWorkout,
                    rounds: [fakeRoundOne, fakeRoundTwo],
                }}
            />
        );

        expect(getByText("minutes")).toBeInTheDocument();
        expect(getByText("rounds")).toBeInTheDocument();
        expect(getByText("exercises")).toBeTruthy();
        expect(getByText("5")).toBeInTheDocument();
        expect(getByText("2")).toBeInTheDocument();
        expect(getByText("13:10")).toBeInTheDocument();
    });
});
