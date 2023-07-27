import React from "react";
import { render, screen } from "../../../tools/testUtils";

import TickBox from "./TickBox";

describe("<TickBox />", () => {
    it("Should return an empty div when not checked", () => {
        render(<TickBox />);

        const $checkbox = screen.getByRole("checkbox", { name: "tick-box" });
        expect($checkbox).toBeInTheDocument();
        expect($checkbox).not.toBeChecked();
        expect(screen.queryByLabelText("checked icon")).toBeNull();
    });

    it("Should return a checked div with icon when checked", () => {
        render(<TickBox checked />);

        const $checkbox = screen.getByRole("checkbox", { name: "tick-box" });
        expect($checkbox).toBeInTheDocument();
        expect($checkbox).toBeChecked();
        expect(screen.getByLabelText("checked icon")).toBeInTheDocument();
    });
});
