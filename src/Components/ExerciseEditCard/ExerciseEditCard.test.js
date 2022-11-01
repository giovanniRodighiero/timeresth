import React from "react";
import { screen, render, userEvent } from "../../../tools/test-utils";

import InputField from "../InputField";
import ExerciseEditParameter from "../ExerciseEditParameter";
import ExerciseEditCard from "./ExerciseEditCard";

const mockProps = {
    exercise: {
        name: "squats",
        work: 20,
        rest: 10,
        repeat: 3,
    },
    onUpdateExercise: jest.fn(),
    onDeleteExercise: jest.fn(),
};

describe("<ExerciseEditCard />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should display a button to delete the exercise", async () => {
        const user = userEvent.setup();
        render(<ExerciseEditCard {...mockProps} />);

        const $btn = screen.getByLabelText("delete exercise");
        expect($btn).toBeInTheDocument();

        await user.click($btn);
        expect(mockProps.onDeleteExercise).toHaveBeenCalled();
    });

    it("Should use the InputField component to handle the name parameter", () => {
        const spyOnInputField = InputField.spyOn();

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
            const spyOnExerciseEditCardParameter =
                ExerciseEditParameter.spyOn();

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
            spyOnExerciseEditCardParameter.mock.calls[indexCall][0].setValue(5);
            expect(mockProps.onUpdateExercise).toHaveBeenCalledWith(label, 5);
        }
    );
});
