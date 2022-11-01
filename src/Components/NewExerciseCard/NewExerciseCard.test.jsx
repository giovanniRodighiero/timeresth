import React from "react";
import { vi, render, userEvent } from "../../../tools/testUtils";

import NewExerciseCard from "./NewExerciseCard";

describe("<NewExerciseCard />", () => {
    it("Should point to the exercise creation page", async () => {
        const user = userEvent.setup();
        const spy = vi.fn();
        const { getByRole } = render(<NewExerciseCard onClick={spy} />);

        const $btn = getByRole("button");
        expect($btn).toBeInTheDocument();

        await user.click($btn);
        expect(spy).toHaveBeenCalled();
    });

    it("Should have the correct text inside", () => {
        const { getByText } = render(<NewExerciseCard onClick={vi.fn()} />);

        expect(getByText("Add exercise")).toBeInTheDocument();
    });
});
