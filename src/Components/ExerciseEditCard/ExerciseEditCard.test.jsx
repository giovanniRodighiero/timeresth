import React from "react";
import { vi, screen, render, userEvent } from "../../../tools/testUtils";

import * as InputField from "../InputField";
import * as ExerciseEditParameter from "../ExerciseEditParameter";
import ExerciseEditCard from "./ExerciseEditCard";

const mockProps = {
    exercise: {
        name: "squats",
        work: 20,
        rest: 10,
        repeat: 3,
    },
    onUpdateExercise: vi.fn(),
    onDeleteExercise: vi.fn(),
};

const spyOnInputField = vi
    .spyOn(InputField, "default")
    .mockReturnValue(<span>mock</span>);
const spyOnExerciseEditCardParameter = vi
    .spyOn(ExerciseEditParameter, "default")
    .mockReturnValue(<span>mock</span>);

describe("<ExerciseEditCard />", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should display a button to delete the exercise when the callback is provided", async () => {
        const user = userEvent.setup();
        render(<ExerciseEditCard {...mockProps} />);

        const $btn = screen.getByLabelText("delete exercise");
        expect($btn).toBeInTheDocument();

        await user.click($btn);
        expect(mockProps.onDeleteExercise).toHaveBeenCalled();
    });

    it("Should not display a button to delete the exercise when the callback is not provided", async () => {
        render(<ExerciseEditCard {...mockProps} onDeleteExercise={undefined} />);

        expect(screen.queryByLabelText("delete exercise")).toBeNull();
    });

    it("Should use the InputField component to handle the name parameter", () => {
        render(<ExerciseEditCard {...mockProps} />);

        expect(spyOnInputField).toHaveBeenCalledWith(
            {
                full: true,
                light: true,
                value: "squats",
                onChange: expect.any(Function),
                inputProps: { placeholder: "exercise name" },
            },
            {}
        );
        // @ts-ignore
        spyOnInputField.mock.calls[0][0].onChange({ target: { value: "aaa" } });
        expect(mockProps.onUpdateExercise).toHaveBeenCalledWith("name", "aaa");
    });

    it.each([
        ["repeat", 3, 1, 0],
        ["work", 20, 1, 1],
        ["rest", 10, 0, 2],
    ])(
        "Should use the ExerciseEditCardParameter component to handle the %s parameter",
        (label, value, min, indexCall) => {
            render(<ExerciseEditCard {...mockProps} />);

            expect(spyOnExerciseEditCardParameter).toHaveBeenCalledWith(
                {
                    light: true,
                    min,
                    label,
                    value,
                    setValue: expect.any(Function),
                },
                {}
            );
            spyOnExerciseEditCardParameter.mock.calls[indexCall]?.[0]?.setValue(
                5
            );
            expect(mockProps.onUpdateExercise).toHaveBeenCalledWith(label, 5);
        }
    );
});
