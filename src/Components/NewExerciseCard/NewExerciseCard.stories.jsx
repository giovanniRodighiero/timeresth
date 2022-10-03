import React from "react";

import NewExerciseCardCmp from "./NewExerciseCard";

export default {
    title: "Components/NewExerciseCard",
    component: NewExerciseCardCmp,
};

const Template = args => <NewExerciseCardCmp {...args} />;
export const NewExerciseCard = Template.bind({});
NewExerciseCard.args = {};
