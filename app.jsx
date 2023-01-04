import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoute, SessionProvider } from "./src/services/auth";
import Login from "./src/Pages/Login";
import HomePage from "./src/Pages/Homepage";
import WorkoutsList from "./src/Pages/WorkoutsList";
import WorkoutUpdate from "./src/Pages/WorkoutUpdate";
import WorkoutExecution from "./src/Pages/WorkoutExecution";
import WorkoutCreate from "./src/Pages/WorkoutCreate/WorkoutCreate";
import NotFound from "./src/Pages/NotFound";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SessionProvider>
                <Routes>
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route
                            path=""
                            element={<HomePage />}
                        />
                        <Route
                            path="workouts"
                            element={<WorkoutsList />}
                        />
                        <Route
                            path="workouts/new"
                            element={<WorkoutCreate />}
                        />
                        <Route
                            path="workouts/:workoutId/edit"
                            element={<WorkoutUpdate />}
                        />
                        <Route
                            path="workouts/:workoutId"
                            element={<WorkoutExecution />}
                        />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </SessionProvider>
        </BrowserRouter>
    </React.StrictMode>
);
