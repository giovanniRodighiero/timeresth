import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./src/Pages/Homepage";
import WorkoutsList from "./src/Pages/WorkoutsList";
import WorkoutUpdate from "./src/Pages/WorkoutUpdate";
import WorkoutExecution from "./src/Pages/WorkoutExecution";
import NotFound from "./src/Pages/NotFound";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<HomePage />} />
                <Route path="workouts" element={<WorkoutsList />}>
                    <Route path=":workoutId" element={<WorkoutExecution />} />
                </Route>
                <Route
                    path="workouts/:workoutId/edit"
                    element={<WorkoutUpdate />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
