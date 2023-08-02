import React from "react";
import { Watch } from "react-feather";

import Modal from "../Modal";
import BaseButton from "../BaseButton";

import getFormattedTime from "../../utils/getFormattedTime";

interface ModalProps {
    /** The modal is visible */
    isVisible?: boolean;

    /** Workout duration in seconds */
    elapsedTime: number;

    /** Done button & click-away callback */
    onClose: () => void;
}

function ModalWorkoutCompleted({
    isVisible = false,
    elapsedTime = 0,
    onClose,
}: ModalProps) {
    const time = getFormattedTime(elapsedTime);

    return (
        <Modal
            title="workout completed!"
            onClose={onClose}
            isVisible={isVisible}
        >
            <div className="mt-6">
                <div className="flex items-center">
                    <Watch
                        size={40}
                        className="mr-5 text-main"
                        aria-label="Clock icon"
                    />
                    <p>
                        <span className="mr-2 font-serif text-3xl">{time}</span>
                        <span className="font-sans font-light">total time</span>
                    </p>
                </div>
                <div className="mt-6">
                    <BaseButton onClick={onClose}>done</BaseButton>
                </div>
            </div>
        </Modal>
    );
}

export default ModalWorkoutCompleted;
