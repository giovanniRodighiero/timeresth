import React from "react";

import ParameterRowCmp from "./ExerciseEditCardParameter";

export default {
    title: "Components/ExerciseEditCardParameter",
    component: ParameterRowCmp,
};

const Template = args => {
    const [value, setValue] = React.useState(args.value ?? 0);

    React.useEffect(() => setValue(args.value), [args.value]);

    return <ParameterRowCmp {...args} value={value} setValue={setValue} />;
};

export const ParameterLight = Template.bind({});
ParameterLight.args = {
    light: true,
    min: 1,
    label: "Repeat",
    value: 5,
};
ParameterLight.parameters = {
    backgrounds: {
        default: "dark",
    },
};

export const ParameterDark = Template.bind({});
ParameterDark.args = {
    min: 1,
    label: "Repeat",
    value: 5,
};
