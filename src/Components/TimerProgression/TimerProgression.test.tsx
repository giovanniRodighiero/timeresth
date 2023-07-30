import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { render, screen } from "../../../tools/testUtils";

import TimerProgression from "./TimerProgression";
import PHASES from "../../types/timer.interface";

const mockProps = {
    seconds: 124,
    phase: PHASES.BREAK,
    percentage: 14.4,
};

vi.mock("react-circular-progressbar", async () => {
    const mod: any = await vi.importActual("react-circular-progressbar");
    return {
        ...mod,
        CircularProgressbarWithChildren: vi
            .fn()
            .mockImplementation(({ children }) => children),
    };
});

describe("<TimerProgression />", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should display the provided seconds value", () => {
        render(<TimerProgression {...mockProps} />);

        expect(screen.getByText(mockProps.seconds));
        expect(screen.getByText("s"));
    });

    it.each([
        { phase: PHASES.BREAK, expected: "Get some rest" },
        { phase: PHASES.DONE, expected: "All done!" },
        { phase: PHASES.GET_READY, expected: "Get ready!" },
        { phase: PHASES.REST, expected: "Get some rest" },
        { phase: PHASES.WORK, expected: "Go!" },
    ])(
        "Should display the correct label depending on timer phase $phase",
        ({ phase, expected }) => {
            render(<TimerProgression {...mockProps} phase={phase} />);

            expect(screen.getByText(expected));
        }
    );

    it("Should call the <CircularProgressbarWithChildren /> with the provided percentage", () => {
        render(<TimerProgression {...mockProps} />);

        expect(CircularProgressbarWithChildren).toHaveBeenLastCalledWith(
            {
                value: mockProps.percentage,
                styles: expect.any(Object),
                children: expect.any(Array),
            },
            {}
        );
    });
});
