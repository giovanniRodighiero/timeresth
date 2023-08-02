import React from "react";
import { vi, screen, render, userEvent } from "../../../tools/testUtils";

import * as Modal from "../Modal";
import ModalWorkoutCompleted from "./ModalWorkoutCompleted";

const mockProps = {
    isVisible: true,
    elapsedTime: 1234,
    onClose: vi.fn(),
};

describe("<ModalWorkoutCompleted />", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should forward the provided props to Modal component", () => {
        const spyModal = vi.spyOn(Modal, "default");
        render(<ModalWorkoutCompleted {...mockProps} />);

        expect(spyModal).toHaveBeenCalledWith(
            {
                title: "workout completed!",
                isVisible: mockProps.isVisible,
                onClose: mockProps.onClose,
                children: expect.any(Object),
            },
            {}
        );
        spyModal.mockRestore();
    });

    it("Should display the proper description inside the modal", () => {
        render(<ModalWorkoutCompleted {...mockProps} />);

        expect(screen.getByText("00:20:34")).toBeInTheDocument();
        expect(screen.getByText("total time")).toBeInTheDocument();
    });

    it("Should call onDiscardChanges when the discard btn is clicked", async () => {
        const user = userEvent.setup();
        expect(mockProps.onClose).toHaveBeenCalledTimes(0);
        render(<ModalWorkoutCompleted {...mockProps} />);

        await user.click(screen.getByRole("button", { name: "done" }));
        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });
});
