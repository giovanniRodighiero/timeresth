import React from "react";

import { PlusBtn } from "./CircleBtns";

export default {
    title: "Components/CircleBtn/PlusBtn",
    component: PlusBtn,
};

const Template = args => <PlusBtn {...args} />;

export const Dark = Template.bind({});
Dark.args = {
    light: false,
};

export const Light = Template.bind({});
Light.args = {
    light: true,
};
Light.parameters = {
    backgrounds: {
        default: "dark",
    },
};
