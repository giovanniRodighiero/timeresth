import React from "react";

import Modal from "../Modal";
import BaseButton from "../BaseButton";

interface ModalProps {
    isVisible?: boolean;
    onClose: () => void;
}

function ModalWorkoutCompleted({ isVisible = false, onClose }: ModalProps) {
    return (
        <Modal
            title="workout completed!"
            onClose={onClose}
            isVisible={isVisible}
        >
            <div className="flex justify-between">
                <div className="mr-1 flex-1">
                    <BaseButton onClick={onClose}>done</BaseButton>
                </div>
            </div>
        </Modal>
    );
}

export default ModalWorkoutCompleted;
