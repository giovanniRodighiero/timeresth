import React from "react";
import { vi, screen, render, userEvent } from "../../../tools/testUtils";

import * as Modal from "../Modal";
import ModalWorkoutChanges from "./ModalWorkoutChanges";

const mockProps = {
    isVisible: true,
    onClose: vi.fn(),
    onDiscardChanges: vi.fn(),
    onSaveChanges: vi.fn(),
};

describe("<ModalWorkoutChanges />", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should forward the provided props to Modal component", () => {
        const spyModal = vi.spyOn(Modal, "default");
        render(
            <ModalWorkoutChanges {...mockProps}>contents</ModalWorkoutChanges>
        );

        expect(spyModal).toHaveBeenCalledWith(
            {
                title: "keep changes?",
                isVisible: mockProps.isVisible,
                onClose: mockProps.onClose,
                children: expect.any(Array),
            },
            {}
        );
        spyModal.mockRestore();
    });

    it("Should display the proper description inside the modal", () => {
        render(<ModalWorkoutChanges {...mockProps} />);

        expect(
            screen.getByText(
                "There are some unsaved changes, would you like to save them?"
            )
        ).toBeInTheDocument();
    });

    it("Should call onDiscardChanges when the discard btn is clicked", async () => {
        const user = userEvent.setup();
        expect(mockProps.onDiscardChanges).toHaveBeenCalledTimes(0);
        render(<ModalWorkoutChanges {...mockProps} />);

        await user.click(screen.getByRole("button", { name: "discard" }));
        expect(mockProps.onDiscardChanges).toHaveBeenCalledTimes(1);
    });

    it("Should call onSaveChanges when the save btn is clicked", async () => {
        const user = userEvent.setup();
        expect(mockProps.onSaveChanges).toHaveBeenCalledTimes(0);
        render(<ModalWorkoutChanges {...mockProps} />);

        await user.click(screen.getByRole("button", { name: "save" }));
        expect(mockProps.onSaveChanges).toHaveBeenCalledTimes(1);
    });
});
