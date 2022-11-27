import React from "react";
import { render, screen, userEvent } from "../../../tools/testUtils";

import ExerciseName from "./ExerciseName";

describe("<ExerciseName />", () => {
    it("Should render the non work time version by default", () => {
        render(<ExerciseName exercise="squats" />);

        expect(screen.getByText("up next")).toBeInTheDocument();
        expect(screen.queryByText("now doing")).toBeNull();
        expect(screen.getByText("squats")).toBeInTheDocument();
    });

    it("Should render the work time version if isWorkTime = true", () => {
        render(<ExerciseName isWorkTime exercise="squats" />);

        expect(screen.getByText("now doing")).toBeInTheDocument();
        expect(screen.queryByText("up next")).toBeNull();
        expect(screen.getByText("squats")).toBeInTheDocument();
    });
});
