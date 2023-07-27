import React from "react";

import TickBox from "./TickBox";

interface WorkoutTickBoxesProps {
    /* Total number of tick boxes to display */
    count: number;

    /* Number of tick boxes checked */
    checkedCount: number;
}

/* Row of tick boxes to track how many rounds/reps have been completed */
function WorkoutTickBoxes({
    count = 1,
    checkedCount = 0,
}: WorkoutTickBoxesProps) {
    const [tickBoxes, setTickBoxes] = React.useState<boolean[]>([]);

    React.useEffect(() => {
        setTickBoxes(
            new Array(count)
                .fill(true, 0, checkedCount)
                .fill(false, checkedCount)
        );
    }, [count, checkedCount]);

    return (
        <div className="flex justify-between gap-1">
            {tickBoxes.map((checked, i) => (
                <TickBox key={`tickbox-${i}`} checked={checked} />
            ))}
        </div>
    );
}

export default WorkoutTickBoxes;
