import React from "react";
import { render, screen } from "../../../tools/testUtils";

import ElapsedTime from "./ElapsedTime";

describe("<ElapsedTime />", () => {
    it("Should render 00:00:00 by default", () => {
        render(<ElapsedTime />);

        expect(screen.getByLabelText("Clock icon")).toBeInTheDocument();
        expect(screen.getByText("00:00:00")).toBeInTheDocument();
    });

    it("Should render 00:20:34 for 1234 seconds", () => {
        render(<ElapsedTime seconds={1234} />);

        expect(screen.getByLabelText("Clock icon")).toBeInTheDocument();
        expect(screen.getByText("00:20:34")).toBeInTheDocument();
    });
});
