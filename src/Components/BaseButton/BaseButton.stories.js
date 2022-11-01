import React from "react";

import BaseButtonCmpt from "./BaseButton";

export default {
    title: "Components/BaseButton",
    component: BaseButtonCmpt,
};

const Template = args => <BaseButtonCmpt>{args.text}</BaseButtonCmpt>;

export const BaseButton = Template.bind({});
BaseButton.args = {
    text: "button text",
};
