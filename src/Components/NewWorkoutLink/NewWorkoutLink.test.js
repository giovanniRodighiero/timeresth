import React from "react";
import { render } from "../../services/test-utils";

import NewWorkoutLink from "./NewWorkoutLink";

describe('<NewWorkoutLink />', () => {
    it('Should point to the exercise creation page', () => {
        const { getByRole } = render(<NewWorkoutLink />);

        const $link = getByRole('link');
        expect($link).toBeInTheDocument();
        expect($link).toHaveAttribute('href', '/workouts/new');
    });

    it('Should have the correct text inside', () => {
        const { getByText } = render(<NewWorkoutLink />);

        expect(getByText('Create new')).toBeInTheDocument();
    });
});