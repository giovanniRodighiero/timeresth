import React from "react";
import { render, userEvent } from "../../../tools/test-utils";

import Parameter from "./ExerciseEditParameter";

describe("<ExerciseEditCardParameter />", () => {
    it("Should render a label, input and two buttons with dark theme", () => {
        const { getAllByRole, getByText, getByRole } = render(
            <Parameter label="repeat" value={2} setValue={jest.fn()} />
        );

        const $btns = getAllByRole("button");
        expect($btns).toHaveLength(2);
        expect($btns.at(0)).toHaveClass("text-dark");
        expect($btns.at(1)).toHaveClass("text-dark");

        const $input = getByRole("spinbutton");
        expect($input).toBeInTheDocument();
        expect($input).toHaveValue(2);
        expect($input).toHaveClass("border-dark");

        const $label = getByText("repeat:");
        expect($label).toBeInTheDocument();
        expect($label).toHaveClass("text-dark");
    });

    it("Should put white colors for light theme", () => {
        const { getAllByRole, getByText, getByRole } = render(
            <Parameter light label="repeat" value={2} setValue={jest.fn()} />
        );

        const $btns = getAllByRole("button");
        expect($btns).toHaveLength(2);
        expect($btns.at(0)).toHaveClass("text-white");
        expect($btns.at(1)).toHaveClass("text-white");

        const $input = getByRole("spinbutton");
        expect($input).toBeInTheDocument();
        expect($input).toHaveValue(2);
        expect($input).toHaveClass("border-white text-white");

        const $label = getByText("repeat:");
        expect($label).toBeInTheDocument();
        expect($label).toHaveClass("text-white");
    });

    it("Should call setValue callback when input changes", async () => {
        const spy = jest.fn();
        const user = userEvent.setup();
        const { getByRole } = render(
            <Parameter label="repeat" value={2} setValue={spy} />
        );

        await user.type(getByRole("spinbutton"), "5");
        expect(spy).toHaveBeenCalledWith(25);
    });

    it("Should not allow to type a value lower than min", async () => {
        const user = userEvent.setup();
        const spy = jest.fn();
        const { getByRole } = render(
            <Parameter label="repeat" min={1} value={2} setValue={spy} />
        );

        const $input = getByRole("spinbutton");
        await user.type($input, "0", {
            initialSelectionStart: 0,
            initialSelectionEnd: 1,
        });
        expect(spy).toHaveBeenCalledWith("");
    });

    it("Should set the min value after blur event when the provided one is empty", async () => {
        const spy = jest.fn();
        const { getByRole } = render(
            <Parameter label="repeat" min={1} value="" setValue={spy} />
        );

        const $input = getByRole("spinbutton");
        $input.focus();
        $input.blur();
        expect(spy).toHaveBeenCalledWith(1);
    });

    it("Should set the min value after blur event when the provided one is less than the min", async () => {
        const spy = jest.fn();
        const { getByRole } = render(
            <Parameter label="repeat" min={4} value={2} setValue={spy} />
        );

        const $input = getByRole("spinbutton");
        $input.focus();
        $input.blur();
        expect(spy).toHaveBeenCalledWith(4);
    });

    it("Should call setValue callback when plus and minus btns are clicked", async () => {
        const spy = jest.fn();
        const user = userEvent.setup();
        const { getByLabelText } = render(
            <Parameter label="repeat" value={2} setValue={spy} />
        );

        await user.click(getByLabelText("Increase"));
        expect(spy).toHaveBeenCalledWith(3);

        await user.click(getByLabelText("Decrease"));
        expect(spy).toHaveBeenCalledWith(1);
    });

    it("Should not call setValue callback when minus is clicked, but the value is qual to min", async () => {
        const spy = jest.fn();
        const user = userEvent.setup();
        const { getByLabelText } = render(
            <Parameter label="repeat" min={1} value={1} setValue={spy} />
        );

        await user.click(getByLabelText("Decrease"));
        expect(spy).not.toHaveBeenCalled();
    });
});
