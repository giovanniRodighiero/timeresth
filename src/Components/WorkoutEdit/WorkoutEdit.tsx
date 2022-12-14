import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import InputField from "../InputField";
import RoundTabs from "../RoundTabs";
import ExerciseEditCard from "../ExerciseEditCard";
import NewExerciseCard from "../NewExerciseCard";
import ExerciseEditCardParameter from "../ExerciseEditParameter";
import BaseButton from "../BaseButton/BaseButton";
import { ACTIONS, Action } from "./reducer";
import calcWorkoutDuration from "../../utils/calcWorkoutDuration";

import Workout from "../../types/workout.interface";
import Round from "../../types/round.interface";
import Exercise from "../../types/exercise.interface";

const SWIPER_MODULES = [Pagination];
const SWIPER_PAGINATION = { clickable: true };

interface WorkoutUpdateProps {
    workout: Workout;
    workoutDispatch: React.Dispatch<Action>;
}

/**
 * Update workout page
 */
function WorkoutUpdate({ workout, workoutDispatch }: WorkoutUpdateProps) {
    const [activeRoundIndex, setActiveRoundIndex] = React.useState(0);

    const totalTime = React.useMemo(
        () => calcWorkoutDuration(workout).toISOString().substring(11, 19),
        [workout.rounds]
    );

    const tabs = React.useMemo(
        () => Array.from(Array(workout.rounds.length), (_, i) => i),
        [workout.rounds.length]
    );

    const onWorkoutNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        workoutDispatch({
            type: ACTIONS.UPDATE_NAME,
            payload: { name: event.currentTarget.value },
        });
    };
    const onRoundDelete = (index: number) => {
        if (index === workout.rounds.length - 1) setActiveRoundIndex(index - 1);
        workoutDispatch({
            type: ACTIONS.DELETE_ROUND,
            payload: { round: index },
        });
    };
    const onRoundAdd = () => {
        setActiveRoundIndex(workout.rounds.length);
        workoutDispatch({ type: ACTIONS.ADD_ROUND });
    };
    const onRoundUpdate =
        (field: Exclude<keyof Round, "exercises">) => (value: number) => {
            workoutDispatch({
                type: ACTIONS.UPDATE_ROUND,
                payload: { round: activeRoundIndex, field, value },
            });
        };
    const onExerciseUpdate =
        (exercise: number) =>
        (field: keyof Exercise, value: number | string) => {
            if (field === "name" && typeof value === "string")
                workoutDispatch({
                    type: ACTIONS.UPDATE_EXERCISE_STR,
                    payload: {
                        round: activeRoundIndex,
                        exercise,
                        field,
                        value,
                    },
                });
            else if (field !== "name" && typeof value === "number")
                workoutDispatch({
                    type: ACTIONS.UPDATE_EXERCISE_NUM,
                    payload: {
                        round: activeRoundIndex,
                        exercise,
                        field,
                        value,
                    },
                });
        };
    const onExerciseDelete = (exercise: number) => () => {
        workoutDispatch({
            type: ACTIONS.DELETE_EXERCISE,
            payload: { round: activeRoundIndex, exercise },
        });
    };
    const onExerciseAdd = () => {
        workoutDispatch({
            type: ACTIONS.ADD_EXERCISE,
            payload: { round: activeRoundIndex },
        });
    };

    const onStart = () => console.log("start wo", workout);

    return (
        <>
            <main className="px-2">
                <InputField
                    full
                    inputProps={{ placeholder: "workout name" }}
                    value={workout.name}
                    onChange={onWorkoutNameChange}
                />

                <div className="my-5">
                    <RoundTabs
                        tabs={tabs}
                        activeTabIndex={activeRoundIndex}
                        onSelect={setActiveRoundIndex}
                        onDelete={onRoundDelete}
                        onAdd={onRoundAdd}
                    />
                </div>

                <div className="mb-2">
                    <ExerciseEditCardParameter
                        label="Repeat"
                        min={1}
                        setValue={onRoundUpdate("repeat")}
                        value={workout.rounds[activeRoundIndex].repeat}
                    />
                </div>
                <div className="mb-5">
                    <ExerciseEditCardParameter
                        label="Break"
                        min={0}
                        setValue={onRoundUpdate("break")}
                        value={workout.rounds[activeRoundIndex].break}
                    />
                </div>

                <Swiper
                    centeredSlides
                    slidesPerView="auto"
                    spaceBetween={30}
                    pagination={SWIPER_PAGINATION}
                    modules={SWIPER_MODULES}
                >
                    {workout.rounds[activeRoundIndex].exercises.map(
                        (exercise, i) => (
                            <SwiperSlide key={`exercise_${i}`}>
                                <div className="pb-9">
                                    <ExerciseEditCard
                                        onUpdateExercise={onExerciseUpdate(i)}
                                        onDeleteExercise={onExerciseDelete(i)}
                                        exercise={exercise}
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    )}
                    <SwiperSlide key="add_one">
                        <div className="pb-9">
                            <NewExerciseCard onClick={onExerciseAdd} />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </main>
            <footer className="fixed bottom-0 left-0 flex w-full justify-between border-t border-gray-300 py-3 px-2">
                <div className="basis-2/3">
                    <span className="mr-2 text-lg capitalize">total time:</span>
                    <span className="text-3xl">{totalTime}</span>
                </div>
                <div className="flex-initial basis-1/3 text-right">
                    <BaseButton onClick={onStart}>start</BaseButton>
                </div>
            </footer>
        </>
    );
}

export default WorkoutUpdate;
