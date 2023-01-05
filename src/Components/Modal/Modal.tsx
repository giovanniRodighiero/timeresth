import React from "react";
import ReactDOM from "react-dom";

import Title from "../Title";
import usePortal from "./usePortal";

interface ModalProps {
    children: JSX.Element[];
    title?: string;
    isVisible?: boolean;
    onClose: () => void;
}
function ModalUI({ children, title = "", onClose }: ModalProps) {
    return (
        <div aria-modal className="fixed top-0 left-0 z-10 h-full w-full">
            <div
                className="h-full w-full bg-black opacity-50"
                role="button"
                aria-label="modal background"
                onClick={onClose}
            ></div>
            <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-5 py-4 text-center">
                <Title color="main">{title}</Title>
                {children}
            </div>
        </div>
    );
}

function Modal({ children, title, isVisible = false, onClose }: ModalProps) {
    const target = usePortal();

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <ModalUI onClose={onClose} title={title}>
            {children}
        </ModalUI>,
        target
    );
}

export default Modal;
