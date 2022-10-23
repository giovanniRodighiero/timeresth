import React from "react";

import ExerciseEditCardCmpt from "./ExerciseEditCard";

export default {
    title: "Components/ExerciseEditCard",
    component: ExerciseEditCardCmpt,
};

const Template = args => <ExerciseEditCardCmpt {...args} />;

export const ExerciseEditCard = Template.bind({});
ExerciseEditCard.args = {
    exercise: {
        name: "Pushups",
        repeat: 5,
        rest: 30,
        work: 20,
    },
};
