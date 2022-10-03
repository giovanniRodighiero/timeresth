import React from "react";
import { render, userEvent } from "../../../tools/test-utils";

import NewExerciseCard from "./NewExerciseCard";

describe("<NewExerciseCard />", () => {
    it("Should point to the exercise creation page", async () => {
        const user = userEvent.setup();
        const spy = jest.fn();
        const { getByRole } = render(<NewExerciseCard onClick={spy} />);

        const $btn = getByRole("button");
        expect($btn).toBeInTheDocument();

        await user.click($btn);
        expect(spy).toHaveBeenCalled();
    });

    it("Should have the correct text inside", () => {
        const { getByText } = render(<NewExerciseCard onClick={jest.fn()} />);

        expect(getByText("Add exercise")).toBeInTheDocument();
    });
});
