import React from "react";

import InputField from "./InputField";

export default {
  title: 'Components/InputField',
  component: InputField,
};

const Template = (args) => <InputField {...args} />;

export const FullWidth = Template.bind({});
FullWidth.args = {
  full: true,
  light: false,
  inputProps: {
    placeholder: "Workout name"
  }
};

export const Light = Template.bind({});
Light.args = {
  full: false,
  light: true,
  inputProps: {
    placeholder: "Workout name"
  }
};

export const Numeric = Template.bind({});
Numeric.args = {
  full: false,
  light: false,
  inputProps: {
    placeholder: 120,
    type: 'number',
    min: 1
  }
};
