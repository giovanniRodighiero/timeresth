import React from "react";
import { vi, screen, render, userEvent } from "../../../tools/testUtils";

import Modal from "./Modal";

describe("<Modal />", () => {
    it("Should not display the modal if invisible", () => {
        const { container } = render(<Modal>contents</Modal>);

        expect(container.firstChild.firstChild).toBeNull();
    });

    it("Should display the modal if visible with the provided contents", () => {
        render(
            <Modal isVisible title="titolo modal">
                contents
            </Modal>
        );

        expect(screen.getByText("titolo modal")).toBeInTheDocument();
        expect(screen.getByText("contents")).toBeInTheDocument();
    });

    it("Should close the modal when the background is clicked", async () => {
        const user = userEvent.setup();
        const spy = vi.fn();
        render(
            <Modal isVisible onClose={spy} title="titolo modal">
                contents
            </Modal>
        );

        expect(screen.getByText("titolo modal")).toBeInTheDocument();
        expect(screen.getByText("contents")).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", { name: "modal background" })
        );

        expect(spy).toHaveBeenCalled();
    });
});
