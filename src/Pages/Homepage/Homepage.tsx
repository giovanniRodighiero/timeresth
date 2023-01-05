import React from "react";
import { LogOut } from "react-feather";

import Title from "../../Components/Title";
import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";
import NewWorkoutLink from "../../Components/NewWorkoutLink";
import Workout from "../../types/workout.interface";

import { getHomepageWorkouts } from "../../services/Api";
import { useAuth } from "../../services/auth";

function HomePage() {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [workouts, setWorkouts] = React.useState<Workout[]>([]);
    const { logout } = useAuth();

    const getWorkouts = async () => {
        setLoading(true);
        const result = await getHomepageWorkouts();
        if (result.error) {
        } else {
            setWorkouts(result.workouts);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        getWorkouts();
    }, []);

    return (
        <main className="w-full p-2">
            <section className="mb-5 flex justify-between">
                <Title>Your workouts</Title>
                <button onClick={logout} aria-label="logout">
                    <LogOut size={30} />
                </button>
            </section>
            {isLoading && <p>spinner</p>}
            {!isLoading && (
                <>
                    {workouts.map(workout => (
                        <div className="mb-3" key={workout.id}>
                            <WorkoutCard workout={workout} />
                        </div>
                    ))}
                    <NewWorkoutLink />
                </>
            )}
            <></>
        </main>
    );
}

export default HomePage;
