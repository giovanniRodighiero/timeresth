import React from "react";

import TopBar from "./TopBar";

export default {
    title: "Components/TopBar",
    component: TopBar,
};

const Template = args => <TopBar {...args} />;

export const Update = Template.bind({});
Update.args = {
    title: "Edit workout",
};

export const Create = Template.bind({});
Create.args = {
    title: "Create workout",
    onDelete: null,
};
