import React from "react";
import classNames from "classnames";
import { XCircle, Plus } from "react-feather";

interface ActiveTabProps {
    /** The tab index. */
    index?: number;

    /** Last tab of the list. */
    isLast?: boolean;

    /** When the delete action on the tab is called. */
    onDelete: (index: number) => void;
}

/** Tab rapresenting a focused round that can be deleted. */
export function ActiveTab({
    index = 0,
    isLast = false,
    onDelete,
}: ActiveTabProps) {
    const styles = classNames(
        {
            "rounded-l": index === 0,
            "rounded-r": isLast,
        },
        "h-full w-28 px-1 flex shrink-0 justify-between items-center bg-main text-white"
    );

    return (
        <div className={styles}>
            <span className="text-xl font-light uppercase">
                round #{index + 1}
            </span>
            {!(index === 0 && isLast) && (
                <button
                    aria-label={`delete round ${index + 1}`}
                    className="text-dark"
                    onClick={_ => onDelete(index)}
                >
                    <XCircle size={24} />
                </button>
            )}
        </div>
    );
}

interface TabProps {
    /** The tab index. */
    index?: number;

    /** Last tab of the list. */
    isLast?: boolean;

    /** When the delete action on the tab is called. */
    onSelect: (index: number) => void;
}

/** Tab rapresenting a non-focused round. */
export function Tab({ index = 0, isLast = false, onSelect }: TabProps) {
    const styles = classNames(
        {
            "border-l-0": index > 0,
            "rounded-l": index === 0,
            "rounded-r": isLast,
        },
        "h-full w-14 shrink-0 bg-white border border-main"
    );

    return (
        <button
            aria-label={`round number ${index + 1}`}
            className={styles}
            onClick={_ => onSelect(index)}
        >
            <span className="text-lg font-light uppercase text-main">
                #{index + 1}
            </span>
        </button>
    );
}

interface AddTabProps {
    /** When a new tab is added. */
    onAdd: React.MouseEventHandler<HTMLButtonElement>;
}

/** Button to add a new tab to the list. */
export function AddTab({ onAdd }: AddTabProps) {
    return (
        <button
            aria-label="add round"
            onClick={onAdd}
            className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded border border-main text-main"
        >
            <Plus size={22} />
        </button>
    );
}

interface RoundTabsProps {
    /** Array containing the indexes of the tabs rapresenting the rounds. */
    tabs: number[];

    /** The index of the focused tab. */
    activeTabIndex?: number;

    /** When the delete action on the tab is called. */
    onDelete: (index: number) => void;

    /** When a tab is selected. */
    onSelect: (index: number) => void;

    /** When a new tab is added. */
    onAdd: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Round tabs widget.
 * Alows the user to switch the focused round while editing the workout.
 */
function RoundTabs({
    tabs = [],
    activeTabIndex = 0,
    onDelete,
    onSelect,
    onAdd,
}: RoundTabsProps) {
    return (
        <div className="relative flex h-11 w-full">
            <div className="flex h-full w-10/12 overflow-scroll">
                {tabs.map(t =>
                    t === activeTabIndex ? (
                        <ActiveTab
                            key={`tab_${t}`}
                            index={t}
                            onDelete={onDelete}
                            isLast={t === tabs.length - 1}
                        />
                    ) : (
                        <Tab
                            key={`tab_${t}`}
                            index={t}
                            isLast={t === tabs.length - 1}
                            onSelect={onSelect}
                        />
                    )
                )}
            </div>
            <AddTab onAdd={onAdd} />
        </div>
    );
}

export default RoundTabs;
