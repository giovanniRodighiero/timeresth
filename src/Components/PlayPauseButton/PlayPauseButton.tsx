import React from "react";
import { Play, Pause } from "react-feather";

interface PlayPauseButtonProps {
    /** Workout is paused or running */
    isPlaying?: boolean;

    /** Pause the workout */
    onPause: () => void;

    /** Run the workout */
    onPlay: () => void;
}

function PlayPauseButton({
    isPlaying = false,
    onPause,
    onPlay,
}: PlayPauseButtonProps) {
    return (
        <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={isPlaying ? onPause : onPlay}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-main shadow-md"
        >
            {!isPlaying && (
                <Play
                    size={45}
                    fill="white"
                    className="pl-2 text-white"
                    aria-label="Play icon"
                />
            )}
            {isPlaying && (
                <Pause
                    size={40}
                    fill="white"
                    className="text-white"
                    aria-label="Pause icon"
                />
            )}
        </button>
    );
}

export default PlayPauseButton;
