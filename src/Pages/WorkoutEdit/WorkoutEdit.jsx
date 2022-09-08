import React from "react";

import TopBar from "../../Components/TopBar";

function WorkoutEdit() {
    const onDelete = () => console.log("delete");

    return (
        <div>
            <TopBar onDelete={onDelete} title="Update workout" />
            <p>workout edit</p>
        </div>
    );
}

export default WorkoutEdit;
