import React from "react";

import WorkoutCard from "./Components/WorkoutCard/WorkoutCard";

function MainPage() {

    return (
        <main>
            <WorkoutCard workout={{ name: 'test', rounds: []}} />
            <h1 className="red text-xl">main aaa page</h1>
            <p className="inline-flex bg-gray-600">aaaa</p>
        </main>
    );
}

export default MainPage;
