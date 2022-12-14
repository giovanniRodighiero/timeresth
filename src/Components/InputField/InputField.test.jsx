import React from "react";
import { vi, render, userEvent } from "../../../tools/testUtils";

import InputField from "./InputField";

const mockProps = {
    value: "",
    onChange: vi.fn(),
};

describe("<InputField />", () => {
    it("Should render a default input with dark class and non-full width when there are no props provided", () => {
        const { getByRole } = render(<InputField {...mockProps} />);

        const $input = getByRole("textbox");
        expect($input).toBeInTheDocument();
        expect($input).toHaveClass("border-dark");
        expect($input).not.toHaveClass("w-full");
    });

    it("Should render a default input with light class and non-full width for light prop", () => {
        const { getByRole } = render(<InputField {...mockProps} light />);

        const $input = getByRole("textbox");
        expect($input).toBeInTheDocument();
        expect($input).not.toHaveClass("border-dark w-full");
        expect($input).toHaveClass("border-white text-white outline-dark");
    });

    it("Should render a default input with full width class for full prop", () => {
        const { getByRole } = render(<InputField {...mockProps} full />);

        const $input = getByRole("textbox");
        expect($input).toBeInTheDocument();
        expect($input).not.toHaveClass("border-white text-white outline-dark");
        expect($input).toHaveClass("w-full");
    });

    it("Should render an input with the provided html attributes", () => {
        const { getByRole } = render(
            <InputField
                {...mockProps}
                inputProps={{ type: "number", min: 1 }}
            />
        );

        const $input = getByRole("spinbutton");
        expect($input).toBeInTheDocument();
        expect($input).toHaveAttribute("min", "1");
    });

    it("Should display the provided value and call the change callback", async () => {
        const onChange = vi.fn();
        const { getByRole } = render(
            <InputField value="abc def" onChange={onChange} />
        );

        const $input = getByRole("textbox");
        expect($input).toBeInTheDocument();
        expect($input).toHaveAttribute("value", "abc def");

        await userEvent.type($input, "a");
        expect(onChange).toHaveBeenCalled();
    });
});
