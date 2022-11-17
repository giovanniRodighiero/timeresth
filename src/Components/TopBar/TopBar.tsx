import React from "react";
import { ArrowLeft, Trash2 } from "react-feather";

interface TopBarProps {
    /** Title displayed in the center. */
    title: string;

    /** Callback for the delete button, if it's missing the button gets hidden. */
    onDelete: React.MouseEventHandler<HTMLButtonElement>;

    /** Callback for the back button. */
    onBack: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Navigation element on top of the page.
 * It is used in the update and create workout page.
 */
function TopBar({ title, onDelete, onBack }: TopBarProps) {
    return (
        <nav className="relative mb-2 flex h-12 items-center justify-between border-b border-b-slate-200 px-2.5">
            <button onClick={onBack} aria-label="Go back to workouts">
                <ArrowLeft size={34} />
            </button>

            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium">
                {title}
            </p>

            {!!onDelete && (
                <button aria-label="Delete workout" onClick={onDelete}>
                    <Trash2 size={30} />
                </button>
            )}
        </nav>
    );
}

export default TopBar;
