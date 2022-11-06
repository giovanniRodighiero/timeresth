import React from "react";
import { vi, screen, render, userEvent } from "../../../tools/testUtils";

import TopBar from "./TopBar";

describe("<TopBar />", () => {
    it("Should render the page title and back btn as a default case", async () => {
        const user = userEvent.setup();
        const spy = vi.fn();
        render(<TopBar title="page title" onBack={spy} />);

        expect(screen.getByText("page title")).toBeInTheDocument();
        const $btn = screen.getByRole("button", {
            name: "Go back to workouts",
        });
        expect($btn).toBeInTheDocument();
        await user.click($btn);
        expect(spy).toHaveBeenCalled();

        expect(
            screen.queryByRole("button", { name: "Delete workout" })
        ).not.toBeInTheDocument();
    });

    it("Should render the component with the delete button if the callback is provided", async () => {
        const onDelete = vi.fn();
        const user = userEvent.setup();
        render(
            <TopBar title="page title" onDelete={onDelete} onBack={vi.fn()} />
        );

        const $btn = screen.getByRole("button", {
            name: "Delete workout",
        });
        expect($btn).toBeInTheDocument();
        await user.click($btn);
        expect(onDelete).toHaveBeenCalled();
    });
});
