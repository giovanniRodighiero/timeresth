import React from "react";
import { Watch } from "react-feather";

import getFormattedTime from "../../utils/getFormattedTime";

interface ElapsedTimeProps {
    /** Total seconds elapsed */
    seconds?: number;
}

function ElapsedTime({ seconds = 0 }: ElapsedTimeProps) {
    const time = getFormattedTime(seconds);

    return (
        <div className="flex w-full flex-col items-center justify-center rounded bg-white px-1 shadow-md">
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
