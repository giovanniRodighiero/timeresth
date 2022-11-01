import React from "react";
import { vi, screen, render, userEvent } from "../../../tools/testUtils";

import BaseButton from "./BaseButton";

describe("<BaseButton />", () => {
    it("Should display a button with the provided text", () => {
        render(<BaseButton>start workout</BaseButton>);

        expect(
            screen.getByRole("button", { name: "start workout" })
        ).toBeInTheDocument();
    });

    it("Should handle html props like aria-label and onClick", async () => {
        const spy = vi.fn();
        const user = userEvent.setup();
        render(
            <BaseButton aria-label="aria label workout" onClick={spy}>
                start workout
            </BaseButton>
        );

        expect(screen.getByLabelText("aria label workout")).toBeInTheDocument();
        await user.click(screen.getByLabelText("aria label workout"));
        expect(spy).toHaveBeenCalled();
    });
});
