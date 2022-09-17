import React from "react";

import { MinusBtn } from "./CircleBtns";

export default {
    title: "Components/CircleBtn/MinusBtn",
    component: MinusBtn,
};

const Template = args => <MinusBtn {...args} />;

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
