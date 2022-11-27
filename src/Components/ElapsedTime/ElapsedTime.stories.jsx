import React from "react";

import ElapsedTimeCmp from "./ElapsedTime";

export default {
    title: "Components/ExerciseExecution/ElapsedTime",
    component: ElapsedTimeCmp,
    decorators: [Story => <div className="w-28">{<Story />}</div>],
};

const Template = args => <ElapsedTimeCmp {...args} />;
export const ElapsedTime = Template.bind({});
ElapsedTime.args = {
    seconds: 1234,
};
