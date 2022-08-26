import React from "react";
import { render } from "../../services/test-utils";

import WorkoutCard from "./WorkoutCard";

const fakeWorkout = {
    id: 'abc',
    name: 'my workout',
    rounds: []
};

const fakeRoundOne = {
    "exercises": [
        {
            "name": "squats",
            "work": 20,
            "rest": 10,
            "repeat": 3
        }, // 30 * 3 = 90
        {
            "name": "push ups",
            "work": 25,
            "rest": 15,
            "repeat": 1
        }, // 40
        {
            "name": "resistance band rows",
            "work": 25,
            "rest": 15,
            "repeat": 1
        }, // 40 - 15 = 25
    ], // 90 + 40 + 25 = 155 => (155 + 45) * 3 => 600 - 45 = 555 09:15
    "repeat": 3,
    "break": 45
};

const fakeRoundTwo = {
    "exercises": [
        {
            "name": "knee to elbow",
            "work": 30,
            "rest": 10,
            "repeat": 1
        }, // 40
        {
            "name": "Plank",
            "work": 40,
            "rest": 10,
            "repeat": 1
        } // 40
    ], // 40 + 40 = 80 => (80 + 30) * 2 = 220 - 30 = 190 03:10
    "repeat": 2,
    "break": 30
}

describe('<WorkoutCard />', () => {

    test('Has both links correct.', () => {
        const { queryAllByRole }  = render(<WorkoutCard workout={fakeWorkout} />);

        expect(queryAllByRole('link')).toHaveLength(2);
        expect(queryAllByRole('link')[0]).toHaveAttribute('href', '/workouts/abc');
        expect(queryAllByRole('link')[1]).toHaveAttribute('href', '/workouts/abc/edit');
    });

    test('Edit link has aria label', () => {
        const { getByLabelText }  = render(<WorkoutCard workout={fakeWorkout} />);

        expect(getByLabelText('Edit workout')).toBeInTheDocument();
    });

    test('Stats are equal to zero if the workout has no rounds', () => {
        const { getByText, getAllByText }  = render(<WorkoutCard workout={fakeWorkout} />);

        expect(getByText('minutes')).toBeInTheDocument();
        expect(getByText('rounds')).toBeInTheDocument();
        expect(getByText('exercises')).toBeInTheDocument();
        expect(getAllByText('0')).toHaveLength(2);
        expect(getByText('00:00')).toBeInTheDocument();
    });

    test('Stats have the correct value for one round', () => {
        const { getByText }  = render(<WorkoutCard workout={{ ...fakeWorkout, rounds: [ fakeRoundOne ]}} />);

        expect(getByText('minutes')).toBeInTheDocument();
        expect(getByText('rounds')).toBeInTheDocument();
        expect(getByText('exercises')).toBeTruthy();
        expect(getByText('3')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('09:15')).toBeInTheDocument();
    });

    test('Stats have the correct value for tow rounds', () => {
        const { getByText }  = render(<WorkoutCard workout={{ ...fakeWorkout, rounds: [ fakeRoundOne, fakeRoundTwo ]}} />);

        expect(getByText('minutes')).toBeInTheDocument();
        expect(getByText('rounds')).toBeInTheDocument();
        expect(getByText('exercises')).toBeTruthy();
        expect(getByText('5')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('13:10')).toBeInTheDocument();
    });
});