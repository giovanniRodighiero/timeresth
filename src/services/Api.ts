import Workout from "../types/workout.interface";
import supabaseClient from "./supabaseClient";

enum ERROR_CODES {
    "GENERIC" = 1,
    "NOT_FOUND" = 2,
}

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

interface updateWorkoutInterface {
    error?: ERROR_CODES;
}
export async function updateWorkout(
    id: number,
    workout: Workout
): Promise<updateWorkoutInterface> {
    try {
        const { error, status, count } = await supabaseClient
            .from("workouts")
            .update(
                {
                    name: workout.name,
                    data: { rounds: workout.rounds },
                },
                { count: "exact" }
            )
            .eq("id", id);

        if (error && status !== 406) return { error: ERROR_CODES.GENERIC };

        if (!count) return { error: ERROR_CODES.NOT_FOUND };

        return {};
    } catch (error) {
        return { error: ERROR_CODES.GENERIC };
    }
}

interface createWorkoutInterface {
    error?: ERROR_CODES.GENERIC;
}
export async function createWorkout(
    workout: Workout
): Promise<createWorkoutInterface> {
    try {
        const { error, status } = await supabaseClient.from("workouts").insert({
            name: workout.name,
            data: { rounds: workout.rounds },
        });

        if (error && status !== 406) return { error: ERROR_CODES.GENERIC };

        return {};
    } catch (error) {
        return { error: ERROR_CODES.GENERIC };
    }
}
