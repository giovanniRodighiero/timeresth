import React from "react";
import { screen, render, userEvent } from "../../../tools/test-utils";

import BaseButton from "./BaseButton";

describe("<BaseButton />", () => {
    it("Should display a button with the provided text", () => {
        render(<BaseButton>start workout</BaseButton>);

        expect(
            screen.getByRole("button", { name: "start workout" })
        ).toBeInTheDocument();
    });

    it("Should handle html props like aria-label and disabled properly", () => {
        render(
            <BaseButton aria-label="aria label workout" disabled>
                start workout
            </BaseButton>
        );

        expect(screen.getByLabelText("aria label workout")).toBeInTheDocument();
        expect(screen.getByLabelText("aria label workout")).toBeDisabled();
    });
});
