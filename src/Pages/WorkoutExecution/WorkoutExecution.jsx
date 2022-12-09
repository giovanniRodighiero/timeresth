import React from "react";
import useTimer from "./useTimer";

function WorkoutExecution() {
    const { play, pause, value } = useTimer({
        id: 1,
        name: "one",
        rounds: [
            {
                repeat: 1,
                break: 20,
                exercises: [{ name: "aaa", work: 10, rest: 15, repeat: 1 }],
            },
        ],
    });
    return (
        <div>
            <button onClick={play}>play</button>
            <button onClick={pause}>pause</button>
            <p>workouts execution, {value}</p>
        </div>
    );
}

export default WorkoutExecution;
