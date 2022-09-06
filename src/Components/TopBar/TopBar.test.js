import React from "react";
import { render, userEvent } from "../../services/test-utils";

import TopBar from "./TopBar";

describe("<TopBar />", () => {
    it('Should render the component without the delete button when callback not provided', () => {
        const { getByText, queryByRole, getByLabelText } = render(<TopBar title="page title" />);

        expect(getByText('page title')).toBeInTheDocument();
        const $backLink = getByLabelText('Go back to workouts');
        expect($backLink).toBeInTheDocument();
        expect($backLink).toHaveAttribute('href', '/workouts');
        expect(queryByRole('button')).toBeNull();
    });

    it('Should render the component with the delete button when callback is provided', async () => {
        const onDelete = jest.fn();
        const user = userEvent.setup();
        const { getByRole, getByLabelText } = render(<TopBar title="page title" onDelete={onDelete} />);

        expect(getByLabelText('Delete workout')).toBeInTheDocument();
        await user.click(getByRole('button'));
        expect(onDelete).toHaveBeenCalled();
    });
});