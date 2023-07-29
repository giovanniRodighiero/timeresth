import React from "react";
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";

interface TimerProgressionProps {
    /** Timer is running training time or rest/brak */
    isWorkTime?: boolean;

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
    isWorkTime = false,
    percentage,
    seconds,
}: TimerProgressionProps) {
    const styles = React.useMemo(
        () =>
            buildStyles({
                pathColor: isWorkTime ? "#e76f51" : "#006DB6",
            }),
        [isWorkTime]
    );

    return (
        <CircularProgressbarWithChildren value={percentage} styles={styles}>
            <span className="font-serif text-3xl">
                {isWorkTime ? "work!" : "rest now"}
            </span>
            <p>
                <span className="font-serif text-8xl">{seconds}</span>
                <span className="font-sans text-3xl font-light">s</span>
            </p>
        </CircularProgressbarWithChildren>
    );
}

export default TimerProgression;
