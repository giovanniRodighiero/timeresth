import React from "react";

import ExerciseNameCmp from "./ExerciseName";

export default {
    title: "Components/ExerciseExecution/ExerciseName",
    component: ExerciseNameCmp,
    decorators: [Story => <div className="w-52">{<Story />}</div>],
};

const Template = args => <ExerciseNameCmp {...args} />;
export const ExerciseName = Template.bind({});
ExerciseName.args = {
    isWorkTime: false,
    exercise: "push ups",
};
