import React from "react";

import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";

function HomePage() {
    return (
        <main>
            <WorkoutCard workout={{ name: "test", id: "aaa", rounds: [] }} />
        </main>
    );
}

export default HomePage;
