import Workout from "../types/workout.interface";
import supabaseClient from "./supabaseClient";

interface getHomepageWorkoutsInterface {
    workouts: Workout[];
    error?: {
        generic?: boolean;
    };
}
export async function getHomepageWorkouts(): Promise<getHomepageWorkoutsInterface> {
    try {
        const {
            data: workouts,
            error,
            status,
        } = await supabaseClient.from("workouts").select("*").limit(5);

        if (error && status !== 406)
            return { workouts: [], error: { generic: true } };

        if (!workouts) return { workouts: [] };

        return {
            workouts: workouts.map(el => ({
                id: el.id,
                name: el.name,
                rounds: el.data.rounds,
            })),
        };
    } catch (error) {
        return { workouts: [], error: { generic: true } };
    }
}

interface getWorkoutInterface {
    workout: Workout | null;
    error?: {
        generic?: boolean;
    };
}
export async function getWorkout(id: number): Promise<getWorkoutInterface> {
    try {
        const {
            data: workouts,
            error,
            status,
        } = await supabaseClient
            .from("workouts")
            .select("*")
            .eq("id", id)
            .limit(1);

        if (error && status !== 406)
            return { workout: null, error: { generic: true } };

        if (!workouts) return { workout: null };

        return {
            workout: {
                id: workouts[0].id,
                name: workouts[0].name,
                rounds: workouts[0].data.rounds,
            },
        };
    } catch (error) {
        return { workout: null, error: { generic: true } };
    }
}
