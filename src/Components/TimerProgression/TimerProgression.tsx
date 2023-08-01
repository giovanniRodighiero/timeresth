import React from "react";
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";

import PHASES from "../../types/timer.interface";

const PHASES_LABELS = {
    [PHASES.GET_READY]: "Get ready!",
    [PHASES.WORK]: "Go!",
    [PHASES.REST]: "Rest now",
    [PHASES.BREAK]: "Rest now",
    [PHASES.DONE]: "All done!",
};

interface TimerProgressionProps {
    /** Which phase it the timer displaying */
    phase: PHASES;

    /** Percentage of the circle */
    percentage: number;

    /** Remaining seconds */
    seconds: number;
}

/**
 * Main widget of the execution page.
 * Circular timer with remaining seconds in the center.
 */
function TimerProgression({
    phase,
    percentage,
    seconds,
}: TimerProgressionProps) {
    const styles = React.useMemo(
        () =>
            buildStyles({
                pathColor: phase === PHASES.WORK ? "#e76f51" : "#006DB6",
            }),
        [phase]
    );

    return (
        <CircularProgressbarWithChildren value={percentage} styles={styles}>
            <span className="font-serif text-3xl">{PHASES_LABELS[phase]}</span>
            <p>
                <span className="font-serif text-8xl">{seconds}</span>
                <span className="font-sans text-3xl font-light">s</span>
            </p>
        </CircularProgressbarWithChildren>
    );
}

export default TimerProgression;
