import React from "react";

import Title from "../../Components/Title";
import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";
import Workout from "../../types/workout.interface";

import { getHomepageWorkouts } from "../../services/Api";

function HomePage() {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [workouts, setWorkouts] = React.useState<Workout[]>([]);

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
            <section className="mb-5">
                <Title>Your workouts</Title>
            </section>
            {isLoading && <p>spinner</p>}
            {!isLoading &&
                workouts.map(workout => (
                    <div className="mb-3">
                        <WorkoutCard key={workout.id} workout={workout} />
                    </div>
                ))}
        </main>
    );
}

export default HomePage;
