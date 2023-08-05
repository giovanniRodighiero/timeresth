import React from "react";
import { act, render, userEvent, screen } from "../../../tools/testUtils";

import * as Api from "../../services/Api";
import * as ModalWorkoutChanges from "../../Components/ModalWorkoutChanges";
import * as TopBar from "../../Components/TopBar";
import * as WorkoutEdit from "../../Components/WorkoutEdit";
import WorkoutCreate from "./WorkoutCreate";
import { ACTIONS } from "../../Components/WorkoutEdit/reducer";

const useNavigate = vi.fn();
vi.mock("../../services/Api");
vi.mock("react-router-dom", async () => {
    const router: any = await vi.importActual("react-router-dom");
    return {
        ...router,
        useNavigate: () => useNavigate,
    };
});

describe("<WorkoutCreate />", () => {
    const spyModal = vi.spyOn(ModalWorkoutChanges, "default");
    const spyTopBar = vi.spyOn(TopBar, "default");
    const spyWorkoutEdit = vi.spyOn(WorkoutEdit, "default");

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should call ModalWorkoutChanges with callbacks and isVisible false on first render", () => {
        render(<WorkoutCreate />);

        expect(spyModal).toHaveBeenCalledWith(
            {
                isVisible: false,
                onClose: expect.any(Function),
                onDiscardChanges: expect.any(Function),
                onSaveChanges: expect.any(Function),
            },
            {}
        );
    });

    it("Should call createWorkout API and then navigate to homepage when save is clicked in the confirmation modal", async () => {
        render(<WorkoutCreate />);

        await spyModal.mock.calls[0][0].onSaveChanges();
        expect(Api.createWorkout).toHaveBeenCalledWith({
            hasChanges: false,
            id: 123,
            name: "new workout",
            rounds: [
                {
                    repeat: 1,
                    break: 45,
                    exercises: [
                        { name: "exercise one", work: 10, rest: 15, repeat: 1 },
                    ],
                },
            ],
        });
        expect(useNavigate).toHaveBeenCalledTimes(1);
        expect(useNavigate).toHaveBeenCalledWith("/");
    });

    it("Should navigate to homepage when discard is clicked in the confirmation modal", async () => {
        render(<WorkoutCreate />);

        await spyModal.mock.calls[0][0].onDiscardChanges();
        expect(Api.createWorkout).not.toHaveBeenCalled();
        expect(useNavigate).toHaveBeenCalledTimes(1);
        expect(useNavigate).toHaveBeenCalledWith("/");
    });

    it("Should call TopBar with proper title and the back button callback should navigate to homepage", () => {
        render(<WorkoutCreate />);

        expect(spyTopBar).toHaveBeenCalledWith(
            {
                title: "New workout",
                onBack: expect.any(Function),
            },
            {}
        );

        expect(useNavigate).toHaveBeenCalledTimes(0);
        spyTopBar.mock.calls[0][0].onBack(
            {} as React.MouseEvent<HTMLButtonElement>
        );
        expect(useNavigate).toHaveBeenCalledTimes(1);
        expect(useNavigate).toHaveBeenCalledWith("/");
    });

    it("Should call ModalWorkoutChanges with isVisible: true when the TopBar back button is pressed and there are pending changes", () => {
        render(<WorkoutCreate />);

        act(() => {
            spyWorkoutEdit.mock.calls[0][0].workoutDispatch({
                type: ACTIONS.UPDATE_NAME,
                payload: { name: "new name" },
            });
        });
        act(() => {
            spyTopBar.mock.calls[1][0].onBack(
                {} as React.MouseEvent<HTMLButtonElement>
            );
        });
        expect(spyModal).toHaveBeenLastCalledWith(
            {
                isVisible: true,
                onClose: expect.any(Function),
                onDiscardChanges: expect.any(Function),
                onSaveChanges: expect.any(Function),
            },
            {}
        );
    });

    it("Should call WorkoutEdit with the default workout", () => {
        render(<WorkoutCreate />);

        expect(spyWorkoutEdit).toHaveBeenCalledWith(
            {
                workout: {
                    hasChanges: false,
                    id: 123,
                    name: "new workout",
                    rounds: [
                        {
                            repeat: 1,
                            break: 45,
                            exercises: [
                                {
                                    name: "exercise one",
                                    work: 10,
                                    rest: 15,
                                    repeat: 1,
                                },
                            ],
                        },
                    ],
                },
                workoutDispatch: expect.any(Function),
                onSave: expect.any(Function),
            },
            {}
        );
    });

    it("Should call createWorkout API and then navigate to homepage when save is clicked from bottom page button", async () => {
        const user = userEvent.setup();
        render(<WorkoutCreate />);

        await user.click(screen.getByRole("button", { name: "save" }));
        expect(Api.createWorkout).toHaveBeenCalledWith({
            hasChanges: false,
            id: 123,
            name: "new workout",
            rounds: [
                {
                    repeat: 1,
                    break: 45,
                    exercises: [
                        { name: "exercise one", work: 10, rest: 15, repeat: 1 },
                    ],
                },
            ],
        });
        expect(useNavigate).toHaveBeenCalledTimes(1);
        expect(useNavigate).toHaveBeenCalledWith("/");
    });
});
