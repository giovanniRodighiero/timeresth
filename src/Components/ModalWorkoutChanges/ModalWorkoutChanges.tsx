import React from "react";

import Modal from "../Modal";
import BaseButton from "../BaseButton";

interface ModalProps {
    isVisible?: boolean;
    onClose: () => void;
    onDiscardChanges: () => void;
    onSaveChanges: () => void;
}

/**
 * A Modal instance used for the workout editing and creation.
 * It has a custom title, text and two buttons: discard and save.
 */
function ModalWorkoutChanges({
    onClose,
    isVisible,
    onDiscardChanges,
    onSaveChanges,
}: ModalProps) {
    return (
        <Modal title="keep changes?" onClose={onClose} isVisible={isVisible}>
            <p className="mt-2 mb-7 text-left font-sans text-lg font-light">
                There are some unsaved changes, would you like to save them?
            </p>
            <div className="flex justify-between">
                <div className="mr-1 flex-1">
                    <BaseButton onClick={onDiscardChanges}>discard</BaseButton>
                </div>
                <div className="mr-1 flex-1">
                    <BaseButton onClick={onSaveChanges}>save</BaseButton>
                </div>
            </div>
        </Modal>
    );
}

export default ModalWorkoutChanges;
