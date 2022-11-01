import React from "react";
import { vi, render, userEvent } from "../../../tools/testUtils";

import { PlusBtn, MinusBtn } from "./CircleBtns";

describe("<PlusBtn />", () => {
    it("Should render a plus btn, dark themed", async () => {
        const spy = vi.fn();
        const { getByLabelText } = render(<PlusBtn onClick={spy} />);

        const $btn = getByLabelText("Increase");
        expect($btn).toBeInTheDocument();
        expect($btn).toHaveClass("text-dark border-dark");
        expect($btn).not.toHaveClass("text-white border-white");
        await userEvent.click($btn);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should render a plus btn, light themed", async () => {
        const { getByLabelText } = render(<PlusBtn onClick={vi.fn()} light />);

        const $btn = getByLabelText("Increase");
        expect($btn).toBeInTheDocument();
        expect($btn).toHaveClass("text-white border-white");
        expect($btn).not.toHaveClass("text-dark border-dark");
    });
});

describe("<MinusBtn />", () => {
    it("Should render a plus btn, dark themed", async () => {
        const spy = vi.fn();
        const { getByLabelText } = render(<MinusBtn onClick={spy} />);

        const $btn = getByLabelText("Decrease");
        expect($btn).toBeInTheDocument();
        expect($btn).toHaveClass("text-dark border-dark");
        expect($btn).not.toHaveClass("text-white border-white");
        await userEvent.click($btn);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Should render a plus btn, light themed", async () => {
        const { getByLabelText } = render(<MinusBtn onClick={vi.fn()} light />);

        const $btn = getByLabelText("Decrease");
        expect($btn).toBeInTheDocument();
        expect($btn).toHaveClass("text-white border-white");
        expect($btn).not.toHaveClass("text-dark border-dark");
    });
});
