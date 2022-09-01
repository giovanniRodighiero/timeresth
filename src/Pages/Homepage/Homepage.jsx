import React from "react";

import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";

function HomePage() {
    return (
        <main>
            <WorkoutCard workout={{ name: 'test', rounds: [] }} />
        </main>
    );
}

export default HomePage;
