import React from "react";

import TimerProgressionCmp from "./TimerProgression";

export default {
    title: "Components/ExerciseExecution/TimerProgression",
    component: TimerProgressionCmp,
    decorators: [Story => <div className="w-52">{<Story />}</div>],
};

const Template = args => <TimerProgressionCmp {...args} />;
export const TimerProgression = Template.bind({});
TimerProgression.args = {
    percentage: 34,
    seconds: 123,
};
