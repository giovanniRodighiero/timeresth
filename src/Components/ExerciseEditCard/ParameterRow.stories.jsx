import React from "react";

import ParameterRowCmp from "./ParameterRow";

export default {
    title: "Components/ExerciseEditCard/ParameterRow",
    component: ParameterRowCmp,
};

const Template = args => {
    const [value, setValue] = React.useState(args.value ?? 0);

    React.useEffect(() => setValue(args.value), [args.value]);

    return <ParameterRowCmp {...args} value={value} setValue={setValue} />;
};

export const ParameterRowLight = Template.bind({});
ParameterRowLight.args = {
    light: true,
    min: 1,
    label: "Repeat",
    value: 5,
};
ParameterRowLight.parameters = {
    backgrounds: {
        default: "dark",
    },
};

export const ParameterRowDark = Template.bind({});
ParameterRowDark.args = {
    min: 1,
    label: "Repeat",
    value: 5,
};
