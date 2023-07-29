import React from "react";

import WorkoutTickBoxes from "../../Components/WorkoutTickBoxes/WorkoutTickBoxes";

interface SetsAndRepsProgressProps {
    label: string;
    currentSet: number;
    totalSets: number;
    currentRep: number;
    totalReps: number;
}

function SetsAndRepsProgress({
    label,
    currentSet,
    totalSets,
    currentRep,
    totalReps,
}: SetsAndRepsProgressProps) {
    return (
        <React.Fragment>
            <div className="mr-2 flex w-24 flex-col text-lg">
                <span className="uppercase text-main">{label}</span>
                <span className="pl-1">
                    {currentSet}/{totalSets}
                </span>
            </div>
            <WorkoutTickBoxes checkedCount={currentRep} count={totalReps} />
        </React.Fragment>
    );
}

export default SetsAndRepsProgress;
