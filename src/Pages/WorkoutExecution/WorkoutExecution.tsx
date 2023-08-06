import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import TopBar from "../../Components/TopBar";
import SetAndRepsProgress from "./SetsAndRepsProgress";
import TimerProgression from "../../Components/TimerProgression/TimerProgression";
import ExerciseName from "../../Components/ExerciseName/ExerciseName";
import ElapsedTime from "../../Components/ElapsedTime/ElapsedTime";
import PlayPauseButton from "../../Components/PlayPauseButton/PlayPauseButton";
import ModalWorkoutCompleted from "../../Components/ModalWorkoutCompleted";

import useTimer from "./useTimer";
import useSoundEffect from "./useSoundEffects";
import { getWorkout } from "../../services/Api";
import PHASES from "../../types/timer.interface";

const NOTIFICATION_TRESHOLD = 3; // seconds

type RouteParams = {
    workoutId: string;
};

function WorkoutExecution({}) {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const navigate = useNavigate();
    const { workoutId: idAsString } = useParams<RouteParams>() as RouteParams;

    const Timer = useTimer();
    const SoundEffects = useSoundEffect();

    const workoutId = React.useMemo(() => parseInt(idAsString), [idAsString]);

    const onBack = () => navigate("/");

    const onPlay = () => {
        SoundEffects.loadAudios();
        Timer.play();
    };

    const fetchWorkout = async () => {
        setLoading(true);
        const result = await getWorkout(workoutId);
        if (result.error) {
            //FIXME: handle errors
        } else if (result.workout) {
            Timer.loadWorkout(result.workout);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        if (Timer.value <= NOTIFICATION_TRESHOLD) {
            if (Timer.value === 0) {
                window.navigator.vibrate(1000);
                SoundEffects.playLongBeep();
            } else {
                window.navigator.vibrate(300);
                SoundEffects.playShortBeep();
            }
        }
    }, [Timer.value]);

    React.useEffect(() => {
        fetchWorkout();
    }, []);

    return (
        <main className="w-full">
            <TopBar
                onBack={onBack}
                title={Timer.workout.name || "Loading workout"}
            />
            <ModalWorkoutCompleted
                isVisible={Timer.phase === PHASES.DONE}
                onClose={onBack}
                elapsedTime={Timer.elapsedTime}
            />
            {!isLoading && (
                <div className="flex h-[85vh] flex-col justify-between px-2">
                    <div className="mb-4">
                        <div className="mb-3 flex items-center">
                            <SetAndRepsProgress
                                label="rounds"
                                currentSet={Timer.roundIndex + 1}
                                totalSets={Timer.workout.rounds.length}
                                currentRep={Timer.roundRepIndex}
                                totalReps={Timer.round.repeat}
                            />
                        </div>
                        <div className="flex items-center">
                            <SetAndRepsProgress
                                label="exercises"
                                currentSet={Timer.exerciseIndex + 1}
                                totalSets={Timer.round.exercises.length}
                                currentRep={Timer.exerciseRepIndex}
                                totalReps={Timer.exercise.repeat}
                            />
                        </div>
                    </div>
                    <div className="mx-auto mb-4 w-64">
                        <TimerProgression
                            seconds={Timer.value}
                            percentage={Timer.percentage}
                            phase={Timer.phase}
                        />
                    </div>
                    <div className="mb-4 flex gap-2">
                        <div className="flex-[4]">
                            <ExerciseName
                                exercise={Timer.exerciseName}
                                isWorkTime={Timer.phase === PHASES.WORK}
                            />
                        </div>
                        <div className="flex-1">
                            <ElapsedTime seconds={Timer.elapsedTime} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <PlayPauseButton
                            isPlaying={Timer.isRunning}
                            onPause={Timer.pause}
                            onPlay={onPlay}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}

export default WorkoutExecution;
