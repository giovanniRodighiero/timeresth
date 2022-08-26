import React from "react";
import { render } from "../../services/test-utils";

import NewWorkoutLink from "./NewWorkoutLink";

describe('<NewWorkoutLink />', () => {
    test('Renders the correct text', () => {
        const { getByText } = render(<NewWorkoutLink />);

        expect(getByText('Create new')).toBeInTheDocument();
    });
});