import React from 'react';

import Title from './Title';

export default {
  title: 'Components/Title',
  component: Title,
};

const Template = (args) => <Title {...args} />;

export const Dark = Template.bind({});
Dark.args = {
  children: 'your workouts',
  color: 'dark'
};

export const Main = Template.bind({});
Main.args = {
  children: Dark.args.children,
  color: 'main'
};

export const White = Template.bind({});
White.args = {
  children: Dark.args.children,
  color: 'white'
};
