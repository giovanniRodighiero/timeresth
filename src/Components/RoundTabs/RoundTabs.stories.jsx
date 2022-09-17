import React from "react";

import RoundTabsComponent from "./RoundTabs";

export default {
    title: "Components/RoundTabs",
    component: RoundTabsComponent,
};

const Template = args => <RoundTabsComponent {...args} />;

export const RoundTabs = Template.bind({});
RoundTabs.args = {
    tabs: [0, 1, 2, 3, 4],
    activeTabIndex: 2,
};
