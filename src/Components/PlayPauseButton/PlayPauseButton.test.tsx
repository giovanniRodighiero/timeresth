import React from "react";
import { render, screen, userEvent } from "../../../tools/testUtils";

import PlayPauseButton from "./PlayPauseButton";

describe("<PlayPauseButton />", () => {
    it("Should display the play version by default", () => {
        render(<PlayPauseButton onPause={vi.fn()} onPlay={vi.fn()} />);

        expect(screen.getByLabelText("Play")).toBeInTheDocument();
        expect(screen.getByLabelText("Play icon")).toBeInTheDocument();
        expect(screen.queryByLabelText("Pause")).toBeNull();
        expect(screen.queryByLabelText("Pause icon")).toBeNull();
    });

    it("Should display the pause version when it is playing", () => {
        render(
            <PlayPauseButton isPlaying onPause={vi.fn()} onPlay={vi.fn()} />
        );

        expect(screen.getByLabelText("Pause")).toBeInTheDocument();
        expect(screen.getByLabelText("Pause icon")).toBeInTheDocument();
        expect(screen.queryByLabelText("Play")).toBeNull();
        expect(screen.queryByLabelText("Play icon")).toBeNull();
    });

    it("Should call the onPlay callback when it is paused", async () => {
        const onPlay = vi.fn();
        const onPause = vi.fn();
        const user = userEvent.setup();
        render(<PlayPauseButton onPause={onPause} onPlay={onPlay} />);

        await user.click(screen.getByLabelText("Play"));
        expect(onPlay).toHaveBeenCalled();
        expect(onPause).not.toHaveBeenCalled();
    });

    it("Should call the onPause callback when it is playing", async () => {
        const onPlay = vi.fn();
        const onPause = vi.fn();
        const user = userEvent.setup();
        render(<PlayPauseButton isPlaying onPause={onPause} onPlay={onPlay} />);

        await user.click(screen.getByLabelText("Pause"));
        expect(onPause).toHaveBeenCalled();
        expect(onPlay).not.toHaveBeenCalled();
    });
});
