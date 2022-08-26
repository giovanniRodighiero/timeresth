import React from 'react';

import NewWorkoutLinkCmp from './NewWorkoutLink';

export default {
    title: 'Components/NewWorkoutLink',
    component: NewWorkoutLinkCmp,
};

const Template = args => <NewWorkoutLinkCmp {...args} />;
export const NewWorkoutLink = Template.bind({});
NewWorkoutLink.args = {};
