import React from "react";

import ModalWorkoutCompletedCmpt from "./ModalWorkoutCompleted";

export default {
    title: "Components/Modal/ModalWorkoutCompleted",
    component: ModalWorkoutCompletedCmpt,
};

const Template = args => <ModalWorkoutCompletedCmpt {...args} />;

export const ModalWorkoutCompleted = Template.bind({});
ModalWorkoutCompleted.args = {
    isVisible: true,
    elapsedTime: 1234,
};
