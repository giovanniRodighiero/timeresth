import React from "react";

import WorkoutTickBoxesCmp from "./WorkoutTickBoxes";

export default {
    title: "Components/ExerciseExecution/WorkoutTickBoxes",
    component: WorkoutTickBoxesCmp,
    decorators: [Story => <div className="w-52">{<Story />}</div>],
};

const Template = args => <WorkoutTickBoxesCmp {...args} />;
export const WorkoutTickBoxes = Template.bind({});
WorkoutTickBoxes.args = {
    count: 5,
    checkedCount: 1,
};
