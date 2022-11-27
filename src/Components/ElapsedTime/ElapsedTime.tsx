import React from "react";
import { Watch } from "react-feather";

interface ElapsedTimeProps {
    /** Total seconds elapsed */
    seconds?: number;
}

function ElapsedTime({ seconds = 0 }: ElapsedTimeProps) {
    const time = new Date(seconds * 1000).toISOString().slice(11, 19);
    return (
        <div className="flex w-full flex-col items-center justify-center rounded bg-white shadow-md">
            <Watch
                size={30}
                className="mb-2 text-main"
                aria-label="Clock icon"
            />
            <span className="font-serif text-3xl">{time}</span>
        </div>
    );
}

export default ElapsedTime;
