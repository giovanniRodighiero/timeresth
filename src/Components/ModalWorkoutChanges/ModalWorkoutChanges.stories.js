import React from "react";

import ModalWorkoutChangesCmpt from "./ModalWorkoutChanges";

export default {
    title: "Components/Modal/ModalWorkoutChanges",
    component: ModalWorkoutChangesCmpt,
};

const Template = args => <ModalWorkoutChangesCmpt {...args} />;

export const ModalWorkoutChanges = Template.bind({});
ModalWorkoutChanges.args = {
    isVisible: true,
};
